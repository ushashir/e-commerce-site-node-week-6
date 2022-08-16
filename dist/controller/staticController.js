"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewProduct = exports.dashboard = exports.home = exports.signUp = exports.login = void 0;
function login(req, res, next) {
    res.render('login', { title: 'login' });
}
exports.login = login;
function signUp(req, res, next) {
    res.render('signup', {
        title: "sign-up-page"
    });
}
exports.signUp = signUp;
function home(req, res, next) {
    res.render('home', { title: "home-page" });
}
exports.home = home;
function dashboard(req, res, next) {
    res.render('dashboard', { title: "dashboard" });
}
exports.dashboard = dashboard;
function addNewProduct(req, res, next) {
    res.render('addProduct', { title: "add new product" });
}
exports.addNewProduct = addNewProduct;
