"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.GetProduct = exports.GetProducts = exports.AddProduct = void 0;
const uuid_1 = require("uuid");
const users_1 = require("../model/users");
const utils_1 = require("../utils/utils");
async function AddProduct(req, res, next) {
    let id = (0, uuid_1.v4)();
    // let todo = { ...req.body, id };
    try {
        const validationResult = utils_1.createUserSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                error: validationResult.error.details[0].message,
            });
        }
        const record = await users_1.UserInstance.create({ ...req.body, id });
        res.status(201);
        res.json({
            message: "You have successfully added a new product",
            record,
        });
    }
    catch (error) {
        res.status(500);
        console.log(error);
    }
}
exports.AddProduct = AddProduct;
// Get all products
async function GetProducts(req, res, next) {
    try {
        const limit = req.query.limit;
        const offset = req.query.offset;
        const record = await users_1.UserInstance.findAll({ where: {}, limit, offset });
        res.status(200).json({
            message: "You have successfully retrieved all products",
            record,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "failed to get users",
            route: "/read",
        });
    }
}
exports.GetProducts = GetProducts;
// Get single User
async function GetProduct(req, res, next) {
    try {
        const { id } = req.params;
        const record = await users_1.UserInstance.findOne({
            where: {
                id,
            },
        });
        res.status(200).json({
            message: `You have successfully retrieved a product with the id of ${id}`,
            record,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "failed to get products",
            route: "/read/:id",
        });
    }
}
exports.GetProduct = GetProduct;
async function updateProduct(req, res, next) {
    try {
        const { id } = req.params;
        const { email, password } = req.body;
        const validationResult = utils_1.updateUserSchema.validate(req.body, utils_1.options);
        const record = await users_1.UserInstance.findOne({
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
        const record = await users_1.UserInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(404).json({
                msg: "Cannot find Todo"
            });
        }
        const deletedRecord = await record.destroy();
        return res.status(200).json({
            msg: "Todo Deleted Succesfully", deletedRecord
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
