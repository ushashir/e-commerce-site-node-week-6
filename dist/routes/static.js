"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
const auth_1 = require("../middleware/auth");
const staticController_1 = require("../controller/staticController");
// static routes
router.get('/login', staticController_1.login);
router.get('/signup', staticController_1.signUp);
router.get('/home', staticController_1.home);
router.get('/login', auth_1.auth, staticController_1.dashboard);
exports.default = router;
