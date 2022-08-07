"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.registrationSchema = exports.updateUserSchema = exports.createUserSchema = exports.productRegistrationSchema = exports.updateProuctSchema = exports.createProductSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createProductSchema = joi_1.default.object().keys({
    email: joi_1.default.string().lowercase().required(),
    password: joi_1.default.string().required(),
});
exports.updateProuctSchema = joi_1.default.object().keys({
    email: joi_1.default.string().lowercase(),
    password: joi_1.default.string(),
});
exports.productRegistrationSchema = joi_1.default.object().keys({
    firstname: joi_1.default.string().required,
    lastname: joi_1.default.string().required,
    email: joi_1.default.string().trim().lowercase().required(),
    phone_number: joi_1.default.number().required(),
    password: joi_1.default.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    confirm_password: joi_1.default.ref('password')
});
exports.createUserSchema = joi_1.default.object().keys({
    email: joi_1.default.string().lowercase().required(),
    password: joi_1.default.string().required(),
});
exports.updateUserSchema = joi_1.default.object().keys({
    email: joi_1.default.string().lowercase(),
    password: joi_1.default.string(),
});
exports.registrationSchema = joi_1.default.object().keys({
    firstname: joi_1.default.string().required,
    lastname: joi_1.default.string().required,
    email: joi_1.default.string().trim().lowercase().required(),
    phone_number: joi_1.default.number().required(),
    password: joi_1.default.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    confirm_password: joi_1.default.ref('password')
});
exports.options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: "",
        },
    },
};
