/* eslint-disable new-cap */
import express from 'express';
import validate from 'express-validation';
import expressJwt from 'express-jwt';
import { jwtSecret } from '../../config/config.mjs';
import { validateLogin } from '../../config/param-validation.mjs';
import authCtrl from './auth.controller.mjs';

const authRoutes = express.Router();

/** POST /api/auth/login - Returns token if correct username and password is provided */
authRoutes.post('/login', validate(validateLogin), authCtrl.login);

/** GET /api/auth/random-number - Protected route,
 * needs token returned by the above as header. Authorization: Bearer {token} */
authRoutes.get('/random-number', expressJwt({ secret: jwtSecret }), authCtrl.getRandomNumber);

export default authRoutes;
