import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { UserInstance } from "../model/users";
import { createUserSchema, options, updateUserSchema } from "../utils/utils";

export async function AddProduct(req: Request, res: Response, next: NextFunction) {
  let id = uuidv4();
  // let todo = { ...req.body, id };
  try {
    const validationResult = createUserSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        error: validationResult.error.details[0].message,
      });
    }
    const record = await UserInstance.create({ ...req.body, id });
    res.status(201);
    res.json({
      message: "You have successfully added a new product",
      record,
    });
  } catch (error) {
    res.status(500);
    console.log(error);
  }
}

// Get all products
export async function GetProducts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const limit = req.query.limit as number | undefined;
    const offset = req.query.offset as number | undefined;
    const record = await UserInstance.findAll({ where: {}, limit, offset });
    res.status(200).json({
      message: "You have successfully retrieved all products",
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

export async function GetProduct(
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
      message: `You have successfully retrieved a product with the id of ${id}`,
      record,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to get products",
      route: "/read/:id",
    });
  }
}

export async function updateProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { email, password } = req.body;
    const validationResult = updateUserSchema.validate(req.body, options);
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
      message: `You have successfully updated a product with the id of ${id}`,
      updateRecord,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to update product",
      route: "/update/:id",
    });
  }
}


export async function deleteProduct(
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