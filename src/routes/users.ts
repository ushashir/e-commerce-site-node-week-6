import express, {Request, Response, NextFunction } from 'express';
var router = express.Router();

import { auth } from '../middleware/auth';

import {
    SignUpUser,
    loginUser,
    GetUsers,
    GetUser,
    updateUser,
    deleteUser,
    Logout
} from '../controller/usersController';

router.get('/logout', Logout);

router.get('/api', GetUsers);
router.get('/api/:id/', GetUser);

router.post('/api', SignUpUser);
router.post('/login', loginUser);

router.post('/signup', SignUpUser);
router.put('/:id', auth, updateUser);
router.delete('/api/:id', auth, deleteUser);

export default router

