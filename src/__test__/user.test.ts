import express, {Request, Response, NextFunction } from 'express';
var router = express.Router();

// import { auth } from '../middleware/auth';

import {
    SignUpUser,
    loginUser,
    GetUsers,
    GetUser,
    updateUser,
    deleteUser,
    logout
} from '../controller/usersController';

describe("Register user", () => {
  it('should throw if username is falsy', () => {
    const args = [null, undefined, NaN, '', 0, false];
    // const result = await SignUpUser(req, res, next)
  })
})



