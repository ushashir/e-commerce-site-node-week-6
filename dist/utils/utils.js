"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.generateToken = exports.loginUserSchema = exports.signUpUserSchema = exports.createProductSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.createProductSchema = joi_1.default.object().keys({
    productName: joi_1.default.string().required(),
    image: joi_1.default.string(),
    brand: joi_1.default.string(),
    category: joi_1.default.string(),
    description: joi_1.default.string(),
    price: joi_1.default.number().required(),
    countInStock: joi_1.default.number(),
    rating: joi_1.default.number(),
    numReviews: joi_1.default.number()
});
exports.signUpUserSchema = joi_1.default.object().keys({
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    email: joi_1.default.string().trim().lowercase().required(),
    phoneNumber: joi_1.default.string().required(),
    password: joi_1.default.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    confirmPassword: joi_1.default.ref('password')
}).with('password', 'confirmPassword');
exports.loginUserSchema = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase().required(),
    password: joi_1.default.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    confirm_password: joi_1.default.ref('password')
}).with('password', 'confirm_password');
const generateToken = (user) => {
    const pass = process.env.JWT_SECRET;
    jsonwebtoken_1.default.sign(user, pass, { expiresIn: '7d' });
};
exports.generateToken = generateToken;
exports.options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: "",
        },
    },
};
