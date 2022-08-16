"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
const staticController_1 = require("../controller/staticController");
const productsController_1 = require("../controller/productsController");
// static routes
router.get('/login', staticController_1.login);
router.get('/signup', staticController_1.signUp);
router.get('/index', async (req, res, next) => {
    let record = await (0, productsController_1.GetProducts)(req, res, next);
    res.render("index", { record });
});
router.get('/dashboard', async (req, res, next) => {
    let record = await (0, productsController_1.GetProducts)(req, res, next);
    res.render("dashboard", { record });
});
router.get('/add-new-product', staticController_1.addNewProduct);
exports.default = router;
