import createError from 'http-errors';
import express, {Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import db from './config/db.config';

import indexRouter from './routes/index';
import productsRouter from './routes/products';
import usersRouter from './routes/users';

db.sync().then(() => {
  console.log('Database connected');
  
}).catch(err => {
  console.log(err)
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname,"..",'views',));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', productsRouter);

// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next) {
  next(createError(404));
});

// error handler
app.use(function(err: { message: string; status: number; }, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
