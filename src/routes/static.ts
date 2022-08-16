import express, {Request, Response, NextFunction } from 'express';
var router = express.Router();

import { auth } from '../middleware/auth';

import {
    login,
    signUp,
    home,
    dashboard,
    addNewProduct,
    
} from '../controller/staticController';
import {
    GetProducts
} from '../controller/productsController';

// static routes
router.get('/login', login)
router.get('/signup', signUp)

router.get('/index', async (req, res, next) => {
    let record = await GetProducts(req, res, next)
    res.render("index",{record})
});

router.get('/dashboard', async (req, res, next) => {
    let record = await GetProducts(req, res, next)
    res.render("dashboard",{record})
});
router.get('/add-new-product', addNewProduct);


export default router

