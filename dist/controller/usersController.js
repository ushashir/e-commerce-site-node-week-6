"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.GetUser = exports.GetUsers = exports.loginUser = exports.SignUpUser = void 0;
const uuid_1 = require("uuid");
const users_1 = require("../model/users");
const utils_1 = require("../utils/utils");
const utils_2 = require("../utils/utils");
const User = require('../model/users');
const bcrypt_1 = __importDefault(require("bcrypt"));
async function SignUpUser(req, res, next) {
    let id = (0, uuid_1.v4)();
    try {
        const validationUser = utils_1.signUpUserSchema.validate(req.body, utils_1.options);
        if (validationUser.error) {
            return res.status(400).json({
                error: validationUser.error.details[0].message,
            });
        }
        const pwHash = await bcrypt_1.default.hash(req.body.password, 8);
        const duplicateEmail = await users_1.UserInstance.findOne({ where: { email: req.body.email } });
        if (duplicateEmail) {
            res.status(409).json({
                msg: "Email has be used already"
            });
        }
        const record = await users_1.UserInstance.create({
            id: id,
            fullName: req.body.fullName,
            gender: req.body.gender,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            password: pwHash,
        });
        console.log(record);
        res.status(201);
        res.json({
            message: "You have successfully created an account",
            record,
        });
    }
    catch (error) {
        res.status(500);
        console.log(error);
    }
}
exports.SignUpUser = SignUpUser;
async function loginUser(req, res, next) {
    let id = (0, uuid_1.v4)();
    try {
        const validationResult = utils_1.loginUserSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                error: validationResult.error.details[0].message,
            });
        }
        const User = await users_1.UserInstance.findOne({ where: { email: req.body.password } });
        const { id } = User;
        const token = (0, utils_2.generateToken)({ id });
        const validUser = await bcrypt_1.default.compare(req.body.password, User.password);
        if (!validUser) {
            res.status(401).json({
                message: "Incorrect Password",
                token,
            });
        }
        if (validUser) {
            res.status(200).json({
                message: "Login Successful",
                token,
            });
        }
        res.status(201);
        res.json({
            message: "You have successfully created an account",
            record: ""
        });
    }
    catch (error) {
        res.status(500);
        console.log(error);
    }
}
exports.loginUser = loginUser;
// Get all users
async function GetUsers(req, res, next) {
    try {
        const limit = req.query.limit;
        const offset = req.query.offset;
        const record = await users_1.UserInstance.findAll({ where: {}, limit, offset });
        res.status(200).json({
            message: "You have successfully retrieved all users",
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
exports.GetUsers = GetUsers;
// Get single User
async function GetUser(req, res, next) {
    try {
        const { id } = req.params;
        const record = await users_1.UserInstance.findOne({
            where: {
                id,
            },
        });
        res.status(200).json({
            message: `You have successfully retrieved a user with the id of ${id}`,
            record,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "failed to get user",
            route: "/read/:id",
        });
    }
}
exports.GetUser = GetUser;
async function updateUser(req, res, next) {
    try {
        const { id } = req.params;
        const { email, password } = req.body;
        // const validationResult = updateUserSchema.validate(req.body, options);
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
            message: `You have successfully updated user with the id of ${id}`,
            updateRecord,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "failed to update user",
            route: "/update/:id",
        });
    }
}
exports.updateUser = updateUser;
async function deleteUser(req, res, next) {
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
exports.deleteUser = deleteUser;
