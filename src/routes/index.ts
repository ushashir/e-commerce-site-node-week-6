import express, { Request, Response, NextFunction } from 'express';
var router = express.Router();
import { SignUpUser, loginUser, RenderLoggedUserDashboard } from '../controller/usersController';
import {auth} from '../middleware/auth'

router.get('/signup', function(req: Request, res: Response, next: NextFunction) {
  res.render('signup', { title: 'sign up page' });
});
router.post('/signup', SignUpUser);

router.get('/regpass', function (req: Request, res: Response, next: NextFunction) {
  res.render('regPass')

}) // registration success pop up
router.get('/login', function(req: Request, res: Response, next: NextFunction) {
  res.render('login', { title: 'login page' });
});
router.post('/login', loginUser);
router.get('/dashboard', auth, RenderLoggedUserDashboard);

// pops up


export default router

