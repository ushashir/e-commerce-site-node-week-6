import express, { Request, Response, NextFunction } from 'express';

var router = express.Router();

import { AddProduct, GetProducts } from '../controller/productsController';

import { SignUpUser,loginUser, RenderLoggedUserDashboard } from '../controller/usersController';

import { auth } from '../middleware/auth';

/* GET home page. */
router.get('/', async (req, res, next) => {
    let record = await GetProducts(req, res, next)
  res.render("index", {
    title: "home page",
    record
  })
});

router.get('/signup', function(req: Request, res: Response, next: NextFunction) {
  res.render('signup', { title: 'sign up page' });
});
router.post('/signup', SignUpUser);

router.get('/login', function(req: Request, res: Response, next: NextFunction) {
  res.render('login', { title: 'login page' });
});
router.post('/login', loginUser);

router.get('/add/products', async (req, res, next) => {
    res.render("addProduct",{title: "add products"})
});
router.post('/add/products', AddProduct);

router.get('/dashboard', RenderLoggedUserDashboard);

export default router

