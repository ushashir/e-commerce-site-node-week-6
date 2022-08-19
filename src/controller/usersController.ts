import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { UserInstance } from "../model/users";
import { signUpUserSchema, options, loginUserSchema } from "../utils/utils";

import { generateToken } from '../utils/utils' 

import bcrypt from 'bcrypt';
import { ProductInstance } from "../model/products";
  
export async function SignUpUser(req: Request, res: Response, next: NextFunction) {
  let id = uuidv4();
  try {
    const validationUser = signUpUserSchema.validate(req.body, options);
    if (validationUser.error) {
      return res.status(400).json({
        error: validationUser.error.details[0].message,
      });
    }
    const pwHash = await bcrypt.hash(req.body.password,8)
    const duplicateEmail =  await UserInstance.findOne({where: {email: req.body.email}})
        if(duplicateEmail){
            res.status(409).json({
                msg:"Email already in use. Kindly fill in another mail"
            })
        }
    const record = await UserInstance.create({
      id: id,
      fullName: req.body.fullName,
      gender: req.body.gender,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      password: pwHash,
    });
    
    res.redirect('/regpass')
      // res.status(201);
    // res.json({
    //   message: "You have successfully created an account",
    //   record,
    // });
  } catch (error) {
     console.log(error);
    res.status(500);
   
  }
}

export async function loginUser(req: Request, res: Response, next: NextFunction) {
  const id = uuidv4();
  try {
    const validationResult = loginUserSchema.validate(req.body, options);
      if (validationResult.error) {
        return res.status(400).json({
          error: validationResult.error.details[0].message,
        });
      }
    const User = await UserInstance.findOne({ where: { email: req.body.email } }) as unknown as { [key: string]: string }
    // console.log(User)
    const { id } = User;
    const token = generateToken({ id })
    // console.log(token)
    const validUser = await bcrypt.compare(req.body.password, User.password)
     if (!validUser) {
      res.status(401).json({
        message: "Incorrect Password",
        token,
        User
      })
    } 

    if (validUser) {
      res.cookie("token", token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: "strict",
        httpOnly: true,
      });
        res.cookie("id",id, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          sameSite: "strict",
          httpOnly: true,
        })
         res.redirect("/dashboard")
    } 
  
  } catch (error) {
      console.log(error);
    res.status(500);
  
  }
}

// function to log user to dashboard
export async function RenderLoggedUserDashboard(req: Request, res: Response, next: NextFunction) {
  let id = req.cookies.id;
  try {
    const record = await UserInstance.findOne({ where: {id},
      include: [{
        model: ProductInstance,
        as: 'products'
      }]
    });
   res.render('dashboard', {record})
  } catch (error) {
    console.log(error)
    res.redirect('/login')
    
    // res.status(500).json({
    //   message: "error, something went wrong"
    // })
  }
}

export async function Logout(req: Request, res: Response, next: NextFunction) {
    res.cookie("token", '', {
        maxAge: 0,
        sameSite: "strict",
        httpOnly: true,
      });
        res.cookie("id",'', {
          maxAge: 0,
          sameSite: "strict",
          httpOnly: true,
        })
    res.redirect('/');
  
}

// Get all users
export async function GetUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const limit = req.query.limit as number | undefined;
    const offset = req.query.offset as number | undefined;
    const record = await UserInstance.findAndCountAll({
      where: {}, limit, offset,
      include: [{
        model: ProductInstance,
        as: 'products'
      }]
  });
    // res.status(200).render('index', {record: record.rows})
    res.status(200).json({
      message: "You have successfully retrieved all users",
      count: record.count,
      record: record.rows
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to get users",
      route: "/api/users",
    });
  }
}

// Get single User
export async function GetUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const record = await UserInstance.findOne({
      where: {
        id,
      },
    });
    res.status(200).json({
      message: `You have successfully retrieved a user with the id of ${id}`,
      record,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to get user",
      route: "/read/:id",
    });
  }
}

export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { email, password } = req.body;
    const record = await UserInstance.findOne({
      where: {
        id,
      },
    });
    if (!record) {
      return res.status(404).json({
        error: "Cannot find user",
      });
    }
    const updateRecord = await record.update({
      email,
      password,
    });

    res.status(202).json({
      message: `You have successfully updated user with the id of ${id}`,
      updateRecord,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to update user",
      route: "/update/:id",
    });
  }
}


export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params
    const record = await UserInstance.findOne({ where: { id } })
    if (!record) {
      return res.status(404).json({
        msg: "Cannot find Product"
      })
    }
    const deletedRecord = await record.destroy();
    return res.status(200).json({
      msg: "Todo Deleted Succesfully", deletedRecord
    })
  }
   catch (error) {
    res.status(500).json({
      message: "failed to delete user",
      route: "/delete/:id",
    });
  }
}

export async function logout(req: Request, res: Response) {
  res.clearCookie("token");
  // res.status(200).json({
  //   message: "You have successfully loggedout"
  // })
  res.redirect('/login');
  
}