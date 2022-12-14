"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.UpdateProduct = exports.RenderUpdate = exports.GetProduct = exports.GetProducts = exports.AddProduct = void 0;
const uuid_1 = require("uuid");
const products_1 = require("../model/products");
const utils_1 = require("../utils/utils");
async function AddProduct(req, res, next) {
    let id = (0, uuid_1.v4)();
    try {
        const verified = req.user;
        const validationResult = utils_1.createProductSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                error: validationResult.error.details[0].message,
            });
        }
        const record = await products_1.ProductInstance.create({
            id,
            ...req.body,
            userId: verified.id
        });
        res.redirect('/dashboard');
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to add product",
            route: "/api/products"
        });
        console.log(error);
    }
}
exports.AddProduct = AddProduct;
// Get all products
async function GetProducts(req, res, next) {
    try {
        const limit = req.query.limit;
        const offset = req.query.offset;
        const record = await products_1.ProductInstance.findAll({ where: {}, limit, offset });
        return record;
    }
    catch (error) {
        res.status(500).json({
            message: "failed to get users",
            route: "/products/api/:id",
        });
    }
}
exports.GetProducts = GetProducts;
async function getRecord(id) {
    try {
        const record = await products_1.ProductInstance.findOne({ where: { id } });
        return record;
    }
    catch (e) {
        throw e;
    }
}
// Get single product api
async function GetProduct(req, res, next) {
    try {
        const { id } = req.params;
        const record = await getRecord(id);
        console.log(record);
        res.status(200).json({
            message: `You have successfully retrieved a product with the id of ${id}`,
            record: record,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "failed to get product"
        });
    }
}
exports.GetProduct = GetProduct;
// render product for update
async function RenderUpdate(req, res, next) {
    try {
        const { id } = req.params;
        const record = await getRecord(id);
        if (record) {
            return res.render('updateProduct', { product: record });
        }
        else
            throw "No record";
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "failed to get product"
        });
    }
}
exports.RenderUpdate = RenderUpdate;
async function UpdateProduct(req, res, next) {
    try {
        const { id } = req.params;
        const { productName, image, brand, category, description, price, countInStock, rating, numReviews } = req.body;
        const validationResult = utils_1.createProductSchema.validate(req.body, utils_1.options);
        const record = await products_1.ProductInstance.findOne({
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
        res.redirect('/dashboard');
        // return res.status(200).json({
        //     message: "you have succesfully updated user",
        //     updateRecord
        // })
    }
    catch (error) {
        res.status(500).json({
            message: "failed to update product",
            route: "/update/:id",
        });
    }
}
exports.UpdateProduct = UpdateProduct;
async function deleteProduct(req, res, next) {
    try {
        const { id } = req.params;
        const record = await products_1.ProductInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(404).json({
                msg: "Cannot find Product"
            });
        }
        const deletedRecord = await record.destroy();
        res.redirect('/dashboard');
        return;
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
exports.deleteProduct = deleteProduct;
