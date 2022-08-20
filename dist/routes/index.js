"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
const usersController_1 = require("../controller/usersController");
const auth_1 = require("../middleware/auth");
router.get('/signup', function (req, res, next) {
    res.render('signup', { title: 'sign up page' });
});
router.get('/login', function (req, res, next) {
    res.render('login', { title: 'login page' });
});
router.get('/dashboard', auth_1.auth, usersController_1.RenderLoggedUserDashboard);
router.get('/regpass', function (req, res, next) {
    res.render('regPass');
});
router.post('/signup', usersController_1.SignUpUser);
router.post('/login', usersController_1.loginUser);
exports.default = router;
