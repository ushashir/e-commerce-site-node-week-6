import express, { Request, Response, NextFunction } from 'express';

var router = express.Router();

import {
    GetProducts
} from '../controller/productsController';

import { auth } from '../middleware/auth';

import {
    login,
    signUp,
    home,
    dashboard,
    addNewProduct,
    
} from '../controller/staticController';

/* GET home page. */
// router.get('/', function(req: Request, res: Response, next: NextFunction) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', async (req, res, next) => {
    let record = await GetProducts(req, res, next)
    res.render("index",{record})
});

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
