import { Request, Response, NextFunction } from "express";


export function login(req: Request, res: Response, next: NextFunction) {
  res.render('login')
}

export function signUp(req: Request, res: Response, next: NextFunction) {
  res.render('signup')
}

export function home(req: Request, res: Response, next: NextFunction) {
  res.render('home')
}

export function dashboard(req: Request, res: Response, next: NextFunction) {
  res.render('dashboard')
}