import express, {Request, Response, NextFunction } from 'express';
var router = express.Router();

import { auth } from '../middleware/auth'

import {
     AddProduct,
    GetProducts,
    GetProduct,
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

// get products render homepage - public route
router.get('/test', async (req, res, next) => {
    // let record = await UpdateProduct(req, res, next)
    res.render("updateProduct")
});
// get products render homepage - public route
router.get('/api/products/:id', async (req, res, next) => {
    let record = await UpdateProduct(req, res, next)
    res.render('updateProduct', {record})
    res.status(200).json({
        message: "you have succesfully updated user",
        record
    })
});

router.get('/api/products/:id', GetProduct); // get single product public

router.get('/add/products', async (req, res, next) => {
    res.render("addProduct",{title: "add products"})
}); // renders add product form on UI
router.post('/add/products', auth, AddProduct); // UI add product endpoint
// router.post('/api/products', AddProduct); // api addproduct endpoint

router.get('/api/products/user', auth, GetUserProducts);

router.get('/update/products', async (req, res, next) => {
    res.render("UpdateProduct",{title: "update products"})
});
router.put('/api/products/:id', auth, UpdateProduct);
router.delete('/api/products/delete/:id', auth, deleteProduct);


router.put('/add/products', UpdateProduct);

export default router

