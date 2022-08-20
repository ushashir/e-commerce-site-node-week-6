import express, {Request, Response, NextFunction } from 'express';
var router = express.Router();

import { auth } from '../middleware/auth';

import {
    SignUpUser,
    LoginUser,
    GetUsers,
    GetUser,
    UpdateUser,
    DeleteUser,
    Logout
} from '../controller/usersController';

router.post('/api/users', SignUpUser);

router.post('/api/login', LoginUser);

router.get('/api/users', GetUsers);

/* GET get a single user */
router.get('/api/user/:id', GetUser);

/* PUT update user. */
router.put('/api/users/:id', auth, UpdateUser);

/* DELETE delete user */
router.delete('/api/users/:id', auth, DeleteUser);

/* logout*/
router.delete('/api/logout', Logout);

export default router

