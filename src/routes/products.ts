import express, {Request, Response, NextFunction } from 'express';
var router = express.Router();

// import { Users } from '../controller/usersController';
import {
     AddProduct,
    GetProducts,
    GetProduct,
    updateProduct,
    deleteProduct
} from '../controller/productsController';

/* POST products listing. */
router.post('/api/products', AddProduct);

/* GET get all products listing. */
router.get('/api/products', GetProducts);

/* GET products by id listing. */
router.get('/api/products/id', GetProduct);

/* PUT edit products listing. */
router.put('/api/products', updateProduct);

/* DELETE products listing. */
router.delete('/api/products', deleteProduct);

export default router

