import express, {Request, Response, NextFunction } from 'express';
var router = express.Router();

import { auth } from '../middleware/auth'

import {
    staticAddProduct,
     AddProduct,
    GetProducts,
    GetProduct,
    GetUserProducts,
    updateProduct,
    deleteProduct
} from '../controller/productsController';
// import { staticAddProduct } from '../controller/usersController';

// static routes
router.get('./addproduct', staticAddProduct)

/* POST products listing. */
/* ACCESS: PRIVATE only registered users*/
router.post('/api/products', auth, AddProduct);

/* GET get all products listing. */
/* ACCESS: PUBLIC only registered users*/
router.get('/api/products/', GetProducts);

/* GET get all products listing by user */
/* ACCESS: PRIVATE only registered users*/
router.get('/api/products/user', auth, GetUserProducts);

/* GET products by id listing. */
/* ACCESS: PUBLIC */
router.get('/api/products/:id', GetProduct);

/* PUT edit products listing. */
/* ACCESS: PRIVATE only registered user*/
router.put('/api/products/:id', auth, updateProduct);

/* DESC; DELETE delete products listing. O*/
/* ACCESS: PRIVATE only registered users*/
router.delete('/api/products/:id', auth, deleteProduct);

export default router

