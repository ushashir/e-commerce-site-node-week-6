"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
const auth_1 = require("../middleware/auth");
const productsController_1 = require("../controller/productsController");
/* POST products listing. */
/* ACCESS: PRIVATE only registered users*/
router.post('/api/products', auth_1.auth, productsController_1.AddProduct);
/* GET get all products listing. */
/* ACCESS: PUBLIC only registered users*/
router.get('/api/products/', productsController_1.GetProducts);
/* GET get all products listing by user */
/* ACCESS: PRIVATE only registered users*/
router.get('/api/products/user', auth_1.auth, productsController_1.GetUserProducts);
/* GET products by id listing. */
/* ACCESS: PUBLIC */
router.get('/api/products/:id', productsController_1.GetProduct);
/* PUT edit products listing. */
/* ACCESS: PRIVATE only registered user*/
router.put('/api/products/:id', auth_1.auth, productsController_1.updateProduct);
/* DESC; DELETE delete products listing. O*/
/* ACCESS: PRIVATE only registered users*/
router.delete('/api/products/:id', auth_1.auth, productsController_1.deleteProduct);
exports.default = router;
