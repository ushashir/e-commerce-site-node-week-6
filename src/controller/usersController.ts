import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { UserInstance } from "../model/users";
import { signUpUserSchema, options, loginUserSchema } from "../utils/utils";

import { generateToken } from '../utils/utils' 

const User = require('../model/users')

import bcrypt from 'bcrypt';

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
                msg:"Email has be used already"
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

    console.log(record)

    res.status(201);
    res.json({
      message: "You have successfully created an account",
      record,
    });
  } catch (error) {
    res.status(500);
    console.log(error);
  }
}

export async function loginUser(req: Request, res: Response, next: NextFunction) {
  let id = uuidv4();
  try {
    const validationResult = loginUserSchema.validate(req.body, options);
      if (validationResult.error) {
        return res.status(400).json({
          error: validationResult.error.details[0].message,
        });
      }
    
     const User = await UserInstance.findOne({ where: { email:req.body.password } }) as unknown as {[key:string]: string}
    
    const { id } = User;
    const token = generateToken({ id })
    const validUser = await bcrypt.compare(req.body.password, User.password)

     if (!validUser) {
      res.status(401).json({
        message: "Incorrect Password",
        token,
      })
    } 

    if (validUser) {
      res.status(200).json({
        message: "Login Successful",
        token,
      })
    } 

    res.status(201);
    res.json({
      message: "You have successfully created an account",
      record: ""
    });
  } catch (error) {
    res.status(500);
    console.log(error);
  }
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
    const record = await UserInstance.findAll({ where: {}, limit, offset });
    res.status(200).json({
      message: "You have successfully retrieved all users",
      record,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to get users",
      route: "/read",
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
    // const validationResult = updateUserSchema.validate(req.body, options);
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
        msg:"Cannot find Todo"
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