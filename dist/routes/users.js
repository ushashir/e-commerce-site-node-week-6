"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
const auth_1 = require("../middleware/auth");
const usersController_1 = require("../controller/usersController");
router.get('/logout', usersController_1.Logout);
router.get('/api', usersController_1.GetUsers);
router.get('/api/:id/', usersController_1.GetUser);
router.post('/api', usersController_1.SignUpUser);
router.post('/login', usersController_1.loginUser);
router.post('/signup', usersController_1.SignUpUser);
router.put('/:id', auth_1.auth, usersController_1.updateUser);
router.delete('/api/:id', auth_1.auth, usersController_1.deleteUser);
exports.default = router;
