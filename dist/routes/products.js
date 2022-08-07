"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
// import { Users } from '../controller/usersController';
const productsController_1 = require("../controller/productsController");
/* POST products listing. */
router.post('/api/products', productsController_1.AddProduct);
/* GET get all products listing. */
router.get('/api/products', productsController_1.GetProducts);
/* GET products by id listing. */
router.get('/api/products/id', productsController_1.GetProduct);
/* PUT edit products listing. */
router.put('/api/products', productsController_1.updateProduct);
/* DELETE products listing. */
router.delete('/api/products', productsController_1.deleteProduct);
exports.default = router;
