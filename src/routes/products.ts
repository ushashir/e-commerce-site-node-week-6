import express, {Request, Response, NextFunction } from 'express';
var router = express.Router();

import { auth } from '../middleware/auth'

import {
     AddProduct,
    GetProducts,
    GetProduct,
    RenderUpdate,
    RenderDelete,
    GetUserProducts,
    UpdateProduct,
    deleteProduct
} from '../controller/productsController'; 

// get products render homepage - public route
router.get('/', async (req, res, next) => {
    let record = await GetProducts(req, res, next)
    res.render("index", {
    title: "home page",
    record
  })
});
// Get products render api - public route
router.get('/api/products', async  (req, res, next) => {
    let record = await GetProducts(req, res, next)
    res.status(200).json({
        message: "You have successfully retrieved all products",
        record,
    })
});

router.get('/api/products/:id', GetProduct)
router.get('/update/product/:id', RenderUpdate)
// router.get('/delete/product/:id', RenderDelete)

router.get('/add/products', async (req, res, next) => {
    res.render("addProduct",{title: "add products"})
}); 
router.get('/api/products/user', auth, GetUserProducts);

router.post('/add/products', auth, AddProduct); // UI add product endpoint
router.put('/api/products/:id', auth, UpdateProduct);
router.post('/api/products/:id', auth, UpdateProduct);

router.delete('/api/products/delete/:id', auth, deleteProduct);
router.post('/api/products/delete/:id', auth, deleteProduct);

export default router

