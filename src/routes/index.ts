import express, { Request, Response, NextFunction } from 'express';


var router = express.Router();

/* GET home page. */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.render('index', { title: 'Express' });
});

/* GET lon page. */
router.get('/api/login', function(req: Request, res: Response, next: NextFunction) {
  res.render('login', { title: 'Express' });
});


export default router
