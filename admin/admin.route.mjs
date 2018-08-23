/* eslint-disable new-cap */
import express from 'express';
import dashboard from './dashboard.mjs';

const adminRouter = express.Router();

adminRouter.get('/user', dashboard.list);
adminRouter.get('/', (req, res) => {
  res.render('index', { title: 'HI', message: 'Hello world1' });
});

export default adminRouter;
