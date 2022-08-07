import express, {Request, Response, NextFunction } from 'express';
var router = express.Router();

import {
    CreateUser,
    GetUsers,
    GetUser,
    updateUser,
    deleteUser
} from '../controller/usersController';


/* POST creat user */
router.post('/api/users', CreateUser);

/* GET get all users listing. */
router.get('/api/users', GetUsers);

/* GET get a single user */
router.get('/api/user/id', GetUser);

/* PUT update user. */
router.put('/api/users', updateUser);

/* DELETE delete user */
router.delete('/api/users', deleteUser);

export default router

