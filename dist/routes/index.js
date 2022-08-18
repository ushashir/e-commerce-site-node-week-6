"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
const productsController_1 = require("../controller/productsController");
const usersController_1 = require("../controller/usersController");
/* GET home page. */
router.get('/', async (req, res, next) => {
    let record = await (0, productsController_1.GetProducts)(req, res, next);
    res.render("index", {
        title: "home page",
        record
    });
});
router.get('/signup', function (req, res, next) {
    res.render('signup', { title: 'sign up page' });
});
router.post('/signup', usersController_1.SignUpUser);
router.get('/login', function (req, res, next) {
    res.render('login', { title: 'login page' });
});
router.post('/login', usersController_1.loginUser);
router.get('/add/products', async (req, res, next) => {
    res.render("addProduct", { title: "add products" });
});
router.post('/add/products', productsController_1.AddProduct);
router.get('/dashboard', usersController_1.RenderLoggedUserDashboard);
exports.default = router;
