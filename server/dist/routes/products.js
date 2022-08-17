"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
const auth_1 = require("../middleware/auth");
const productsController_1 = require("../controller/productsController");
// import { staticAddProduct } from '../controller/usersController';
// static routes
router.get('./addproduct', auth_1.auth, productsController_1.staticAddProduct);
router.post('/api/products', auth_1.auth, productsController_1.AddProduct);
router.get('/api/products', async (req, res, next) => {
    let record = await (0, productsController_1.GetProducts)(req, res, next);
    res.status(200).json({
        message: "You have successfully retrieved all products",
        record,
    });
});
router.get('/api/products/user', auth_1.auth, productsController_1.GetUserProducts);
router.get('/api/products/:id', productsController_1.GetProduct);
router.put('/api/products/:id', auth_1.auth, productsController_1.UpdateProduct);
router.delete('/api/products/:id', auth_1.auth, productsController_1.DeleteProduct);
exports.default = router;
