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
router.get('/api/users', GetUsers);
router.get('/api/user/:id/', GetUser);

router.post('/api/users', SignUpUser);
router.post('/api/login', loginUser);
router.put('/api/users/:id', auth, updateUser);
router.delete('/api/users/:id', auth, deleteUser);

export default router

