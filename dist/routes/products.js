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
// get products render homepage - public route
router.get('/test', async (req, res, next) => {
    // let record = await UpdateProduct(req, res, next)
    res.render("updateProduct");
});
// get products render homepage - public route
router.get('/api/products/:id', async (req, res, next) => {
    let record = await (0, productsController_1.UpdateProduct)(req, res, next);
    res.render('updateProduct', { record });
    res.status(200).json({
        message: "you have succesfully updated user",
        record
    });
});
router.get('/api/products/:id', productsController_1.GetProduct); // get single product public
router.get('/add/products', async (req, res, next) => {
    res.render("addProduct", { title: "add products" });
}); // renders add product form on UI
router.post('/add/products', auth_1.auth, productsController_1.AddProduct); // UI add product endpoint
// router.post('/api/products', AddProduct); // api addproduct endpoint
router.get('/api/products/user', auth_1.auth, productsController_1.GetUserProducts);
router.get('/update/products', async (req, res, next) => {
    res.render("UpdateProduct", { title: "update products" });
});
router.put('/api/products/:id', auth_1.auth, productsController_1.UpdateProduct);
router.delete('/api/products/delete/:id', auth_1.auth, productsController_1.deleteProduct);
router.put('/add/products', productsController_1.UpdateProduct);
exports.default = router;
