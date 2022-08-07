"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
const usersController_1 = require("../controller/usersController");
/* POST creat user */
router.post('/api/users', usersController_1.CreateUser);
/* GET get all users listing. */
router.get('/api/users', usersController_1.GetUsers);
/* GET get a single user */
router.get('/api/user/id', usersController_1.GetUser);
/* PUT update user. */
router.put('/api/users', usersController_1.updateUser);
/* DELETE delete user */
router.delete('/api/users', usersController_1.deleteUser);
exports.default = router;
