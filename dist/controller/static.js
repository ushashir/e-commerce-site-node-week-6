"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboard = exports.home = exports.signUp = exports.login = void 0;
function login(req, res, next) {
    res.render('login');
}
exports.login = login;
function signUp(req, res, next) {
    res.render('signup');
}
exports.signUp = signUp;
function home(req, res, next) {
    res.render('home');
}
exports.home = home;
function dashboard(req, res, next) {
    res.render('dashboard');
}
exports.dashboard = dashboard;
