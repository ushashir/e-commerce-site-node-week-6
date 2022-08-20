"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
const auth_1 = require("../middleware/auth");
const productsController_1 = require("../controller/productsController");
// get products render homepage - public route
router.get('/', async (req, res, next) => {
    let record = await (0, productsController_1.GetProducts)(req, res, next);
    res.render("index", {
        title: "home page",
        record
    });
});
// Get products render api - public route
router.get('/api/products', async (req, res, next) => {
    let record = await (0, productsController_1.GetProducts)(req, res, next);
    res.status(200).json({
        message: "You have successfully retrieved all products",
        record,
    });
});
router.get('/api/products/:id', productsController_1.GetProduct);
router.get('/update/product/:id', productsController_1.RenderUpdate);
// router.get('/delete/product/:id', RenderDelete)
router.get('/add/products', async (req, res, next) => {
    res.render("addProduct", { title: "add products" });
});
router.get('/api/products/user', auth_1.auth, productsController_1.GetUserProducts);
router.post('/add/products', auth_1.auth, productsController_1.AddProduct); // UI add product endpoint
router.put('/api/products/:id', auth_1.auth, productsController_1.UpdateProduct);
router.post('/api/products/:id', auth_1.auth, productsController_1.UpdateProduct);
router.delete('/api/products/delete/:id', auth_1.auth, productsController_1.deleteProduct);
router.post('/api/products/delete/:id', auth_1.auth, productsController_1.deleteProduct);
exports.default = router;
