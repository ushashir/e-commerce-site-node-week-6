import express, {Request, Response, NextFunction } from 'express';
var router = express.Router();

import { auth } from '../middleware/auth'

import {
    staticAddProduct,
     AddProduct,
    GetProducts,
    GetProduct,
    GetUserProducts,
    UpdateProduct,
    DeleteProduct
} from '../controller/productsController';
// import { staticAddProduct } from '../controller/usersController';

// static routes
router.get('./addproduct', auth, staticAddProduct)


router.post('/api/products', auth, AddProduct);

router.get('/api/products', async  (req, res, next) => {
    let record = await GetProducts(req, res, next)
    res.status(200).json({
        message: "You have successfully retrieved all products",
        record,
    })
});

router.get('/api/products/user', auth, GetUserProducts);

router.get('/api/products/:id', GetProduct);

router.put('/api/products/:id', auth, UpdateProduct);

router.delete('/api/products/:id', auth, DeleteProduct);

export default router

