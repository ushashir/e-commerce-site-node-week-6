"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.GetUserProducts = exports.GetProduct = exports.GetProducts = exports.AddProduct = void 0;
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
        res.status(201);
        res.json({
            message: "You have successfully added a new product",
            record,
        });
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
        res.render("index", { record });
        // res.status(200).json({
        //   message: "You have successfully retrieved all products",
        //   record,
        // });
    }
    catch (error) {
        res.status(500).json({
            message: "failed to get users",
            route: "/api/products/:id",
        });
    }
}
exports.GetProducts = GetProducts;
// Get single product
async function GetProduct(req, res, next) {
    try {
        const { id } = req.params;
        console.log(id);
        const record = await products_1.ProductInstance.findOne({ where: { id } });
        res.status(200).json({
            message: `You have successfully retrieved a product with the id of ${id}`,
            record
        });
    }
    catch (error) {
        res.status(500).json({
            message: "failed to get product"
        });
    }
}
exports.GetProduct = GetProduct;
async function GetUserProducts(req, res, next) {
    try {
        const limit = req.query.limit;
        const offset = req.query.offset;
        const record = await products_1.ProductInstance.findAll({
            where: {}, limit, offset,
            include: [{
                    model: products_1.ProductInstance,
                    as: 'products'
                }]
        });
        res.render("index", { record });
        res.status(200).json({
            message: "You have successfully retrieved all products",
            record,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "failed to get users",
            route: "/api/products/user",
        });
    }
}
exports.GetUserProducts = GetUserProducts;
async function updateProduct(req, res, next) {
    try {
        const { id } = req.params;
        const { productName, image, brand, category, description, price, countInStock, rating, numReviews } = req.body;
        const validationResult = utils_1.createProductSchema.validate(req.body, utils_1.options);
        const record = await products_1.ProductInstance.findOne({
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
            category,
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
    }
    catch (error) {
        res.status(500).json({
            message: "failed to update product",
            route: "/update/:id",
        });
    }
}
exports.updateProduct = updateProduct;
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
        return res.status(200).json({
            msg: "Product Deleted Succesfully", deletedRecord
        });
    }
    catch (error) {
        res.status(500).json({
            message: "failed to delete user",
            route: "/delete/:id",
        });
    }
}
exports.deleteProduct = deleteProduct;
