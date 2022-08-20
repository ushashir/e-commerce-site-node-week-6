import express, {Request, Response, NextFunction } from 'express';
var router = express.Router();

import { auth } from '../middleware/auth'

import {
     AddProduct,
    GetProducts,
    GetProduct,
    UpdateProduct,
    deleteProduct
} from '../controller/productsController'; 

router.get('/api', async  (req, res, next) => {
    let record = await GetProducts(req, res, next)
    res.status(200).json({
        message: "You have successfully retrieved all products",
        record,
    })
});
router.get('/api/:id', GetProduct)
router.put('/api/:id', auth, UpdateProduct);

// submit forms
router.post('/add', auth, AddProduct); // submits /add/products form
router.post('/api/:id', auth, UpdateProduct);

router.delete('/api/delete/:id', auth, deleteProduct);
router.post('/api/delete/:id', auth, deleteProduct); // submits /delete/product form

export default router

