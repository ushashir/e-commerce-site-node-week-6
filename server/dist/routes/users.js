"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
const auth_1 = require("../middleware/auth");
const usersController_1 = require("../controller/usersController");
router.post('/api/users', usersController_1.SignUpUser);
router.post('/api/login', usersController_1.LoginUser);
router.get('/api/users', usersController_1.GetUsers);
/* GET get a single user */
router.get('/api/user/:id/', usersController_1.GetUser);
/* PUT update user. */
router.put('/api/users/:id', auth_1.auth, usersController_1.UpdateUser);
/* DELETE delete user */
router.delete('/api/users/:id', auth_1.auth, usersController_1.DeleteUser);
/* logout*/
router.delete('/api/logout', usersController_1.Logout);
exports.default = router;
