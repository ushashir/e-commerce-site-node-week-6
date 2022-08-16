import { Request, Response, NextFunction } from "express";

import { GetProduct } from "./productsController";


export function login(req: Request, res: Response, next: NextFunction) {
  res.render('login', {title: 'login'})
}

export function signUp(req: Request, res: Response, next: NextFunction) {
  res.render('signup', {
    title: "sign-up-page"
  })
}

export function home(req: Request, res: Response, next: NextFunction) {
  res.render('home', {title: "home-page"})
}

export function dashboard(req: Request, res: Response, next: NextFunction) {
  res.render('dashboard', {title: "dashboard"})
}

export function addNewProduct(req: Request, res: Response, next: NextFunction) {
  res.render('addProduct', {title: "add new product"})
}