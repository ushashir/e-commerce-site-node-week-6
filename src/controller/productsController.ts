import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { ProductInstance } from "../model/products";

import { createProductSchema, options} from "../utils/utils";


export async function AddProduct(req: Request | any, res: Response, next: NextFunction) {
  let id = uuidv4();
  try {
    const verified = req.user;
    const validationResult = createProductSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        error: validationResult.error.details[0].message,
      });
    }
    const record = await ProductInstance.create({
      id,
      ...req.body,
      userId: verified.id
    });
    res.redirect('/dashboard')
  } catch (error) {
    res.status(500).json({
      msg: "failed to add product",
      route: "/api/products"
    });
    console.log(error)
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
    return record;
 
  } catch (error) {
    res.status(500).json({
      message: "failed to get users",
      route: "/products/api/:id",
    });
  }
}

async function getRecord(id: string) {
  try {
    const record = await ProductInstance.findOne({ where: { id } });
    return record;
  } catch (e) {
    throw e;
  }
}
// Get single product api
export async function GetProduct( req: Request, res: Response, next: NextFunction ) {
  try {
    const {id} = req.params;
    const record = await getRecord(id);
    console.log(record)
    res.status(200).json({
      message: `You have successfully retrieved a product with the id of ${id}`,
      record: record,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to get product"
    });
  }
}

// render product for update
export async function RenderUpdate( req: Request, res: Response, next: NextFunction ) {
  try {
    const { id } = req.params;
    const record = await getRecord(id);
    if (record) {
      return res.render('updateProduct', {product: record})
    } else throw "No record";
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "failed to get product"
    });
  }
}

export async function UpdateProduct( req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const {
            productName,
            image,
            brand,
            category,
            description,
            price,
            countInStock,
            rating,
            numReviews
      } = req.body;
    const validationResult = createProductSchema.validate(req.body, options);
    const record = await ProductInstance.findOne({
      where: { id },
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
            category,
            description,
            price,
            countInStock,
            rating,
            numReviews
    });
    res.redirect('/dashboard')
    // return res.status(200).json({
    //     message: "you have succesfully updated user",
    //     updateRecord
    // })
    
  } catch (error) {
    res.status(500).json({
      message: "failed to update product",
      route: "/update/:id",
    });
  }
}


export async function deleteProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params
    const record = await ProductInstance.findOne({ where: { id } })
    if (!record) {
      return res.status(404).json({
        msg:"Cannot find Product"
      })
    }
    const deletedRecord = await record.destroy();
    res.redirect('/dashboard')
    return
    // return res.status(200).json({
    //   msg: "Product Deleted Succesfully", deletedRecord
    // })
  }
   catch (error) {
    res.status(500).json({
      message: "failed to delete user",
      route: "/delete/:id",
    });
  }
}