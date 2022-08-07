import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { ProductInstance } from "../model/products";

import { createProductSchema, options} from "../utils/utils";

export async function AddProduct(req: Request, res: Response, next: NextFunction) {
  let id = uuidv4();
  // let todo = { ...req.body, id };
  try {
    const validationResult = createProductSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        error: validationResult.error.details[0].message,
      });
    }
    const record = await ProductInstance.create({ ...req.body, id });
    console.log(record)
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
    const record = await ProductInstance.findAll({ where: {}, limit, offset });
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

// Get single product
export async function GetProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const record = await ProductInstance.findOne({
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
    const {
            productName,
            image,
            brand,
            categories,
            description,
            price,
            countInStock,
            rating,
            numReviews
      } = req.body;
    const validationResult = createProductSchema.validate(req.body, options);
    const record = await ProductInstance.findOne({
      where: {
        id,
      },
    });
    if (!record) {
      return res.status(404).json({
        error: "Cannot find product",
      });
    }
    const updateRecord = await record.update({
            productName,
            image,
            brand,
            categories,
            description,
            price,
            countInStock,
            rating,
            numReviews
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
    const record = await ProductInstance.findOne({ where: { id } })
    if (!record) {
      return res.status(404).json({
        msg:"Cannot find Product"
      })
    }
    const deletedRecord = await record.destroy();
    return res.status(200).json({
      msg: "Product Deleted Succesfully", deletedRecord
    })
  }
   catch (error) {
    res.status(500).json({
      message: "failed to delete user",
      route: "/delete/:id",
    });
  }
}