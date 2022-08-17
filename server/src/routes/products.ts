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
router.get('./addproduct', auth, staticAddProduct)

/* POST products listing. */
/* ACCESS: PRIVATE only registered users*/
router.post('/api/products', auth, AddProduct);

/* GET get all products listing. */
/* ACCESS: PUBLIC only registered users*/
router.get('/api/products', async  (req, res, next) => {
    let record = await GetProducts(req, res, next)
    res.status(200).json({
        message: "You have successfully retrieved all products",
        record,
    })
});

/* GET get all products listing by user */
/* ACCESS: PRIVATE only registered users*/
router.get('/api/products/user', auth, GetUserProducts);

/* GET products by id listing. */
/* ACCESS: PUBLIC */
router.get('/api/products/:id', GetProduct);

/* PUT edit products listing. */
/* ACCESS: PRIVATE only registered user*/
router.put('/api/products/put/:id', auth, updateProduct);

/* DESC; DELETE delete products listing. O*/
/* ACCESS: PRIVATE only registered users*/
router.delete('/api/products/delete/:id', auth, deleteProduct);

export default router
