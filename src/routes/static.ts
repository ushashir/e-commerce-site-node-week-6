import express, {Request, Response, NextFunction } from 'express';
var router = express.Router();

import { auth } from '../middleware/auth';

import {
    login,
    signUp,
    home,
    dashboard,
    
} from '../controller/staticController';

// static routes
router.get('/login', login)
router.get('/signup', signUp)
router.get('/home', home);
router.get('/login', auth, dashboard);


export default router

