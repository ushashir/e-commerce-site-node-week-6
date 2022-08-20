"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
const auth_1 = require("../middleware/auth");
const productsController_1 = require("../controller/productsController");
router.get('/api', async (req, res, next) => {
    let record = await (0, productsController_1.GetProducts)(req, res, next);
    res.status(200).json({
        message: "You have successfully retrieved all products",
        record,
    });
});
router.get('/api/:id', productsController_1.GetProduct);
router.put('/api/:id', auth_1.auth, productsController_1.UpdateProduct);
// submit forms
router.post('/add', auth_1.auth, productsController_1.AddProduct); // submits /add/products form
router.post('/api/:id', auth_1.auth, productsController_1.UpdateProduct);
router.delete('/api/delete/:id', auth_1.auth, productsController_1.deleteProduct);
router.post('/api/delete/:id', auth_1.auth, productsController_1.deleteProduct); // submits /delete/product form
exports.default = router;
