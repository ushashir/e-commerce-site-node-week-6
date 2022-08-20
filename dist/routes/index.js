"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
const usersController_1 = require("../controller/usersController");
const productsController_1 = require("../controller/productsController");
const auth_1 = require("../middleware/auth");
// pages
router.get('/', async (req, res, next) => {
    let record = await (0, productsController_1.GetProducts)(req, res, next);
    res.render("index", {
        title: "home page",
        record
    });
});
router.get('/dashboard', auth_1.auth, usersController_1.RenderLoggedUserDashboard); // dashboard page
// forms
router.get('/signup', function (req, res, next) {
    res.render('signup', { title: 'sign up page' });
});
router.get('/login', function (req, res, next) {
    res.render('login', { title: 'login page' });
});
router.get('/add/products', async (req, res, next) => {
    res.render("addProduct", { title: "add products" });
});
router.get('/update/product/:id', productsController_1.RenderUpdate);
// alerts
router.get('/regpass', function (req, res, next) {
    res.render('regPass');
});
exports.default = router;
