import express, { Request, Response, NextFunction } from 'express';
var router = express.Router();
import { SignUpUser, loginUser, RenderLoggedUserDashboard } from '../controller/usersController';
import {auth} from '../middleware/auth'

router.get('/signup', function(req: Request, res: Response, next: NextFunction) {
  res.render('signup', { title: 'sign up page' });
});
router.get('/login', function(req: Request, res: Response, next: NextFunction) {
  res.render('login', { title: 'login page' });
});
router.get('/dashboard', auth, RenderLoggedUserDashboard);
router.get('/regpass', function (req: Request, res: Response, next: NextFunction) {
  res.render('regPass')
}) 

router.post('/signup', SignUpUser);
router.post('/login', loginUser);

export default router

