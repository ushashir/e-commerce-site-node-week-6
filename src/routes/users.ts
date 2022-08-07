import express, {Request, Response, NextFunction } from 'express';
var router = express.Router();

import { auth } from '../middleware/auth';

import {
    SignUpUser,
    loginUser,
    GetUsers,
    GetUser,
    updateUser,
    deleteUser
} from '../controller/usersController';


/* POST sign up user */
router.post('/api/users', SignUpUser);

/* POST login user */
router.post('/api/login', auth, loginUser);

/* GET get all users listing. */
router.get('/api/users', GetUsers);

/* GET get a single user */
router.get('/api/user/id', GetUser);

/* PUT update user. */
router.put('/api/users', auth, updateUser);

/* DELETE delete user */
router.delete('/api/users', auth, deleteUser);

export default router
