import express, { Request, Response, NextFunction } from 'express';
var router = express.Router();
import { RenderLoggedUserDashboard } from '../controller/usersController';
import { RenderUpdate, GetProducts} from '../controller/productsController';
import { auth } from '../middleware/auth'


// pages
router.get('/', async (req, res, next) => {
    let record = await GetProducts(req, res, next)
    res.render("index", {
    title: "home page",
    record
  })
});
router.get('/dashboard', auth, RenderLoggedUserDashboard); // dashboard page

// forms
router.get('/signup', function(req: Request, res: Response, next: NextFunction) {
  res.render('signup', { title: 'sign up page' });
});
router.get('/login', function(req: Request, res: Response, next: NextFunction) {
  res.render('login', { title: 'login page' });
});
router.get('/add/products', async (req, res, next) => {
    res.render("addProduct",{title: "add products"})
}); 
router.get('/update/product/:id', RenderUpdate)

// alerts
router.get('/regpass', function (req: Request, res: Response, next: NextFunction) {
  res.render('regPass')
}) 

export default router

