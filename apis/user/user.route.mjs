/* eslint-disable new-cap */
import express from 'express';
import validate from 'express-validation';
import { validateCreateUser, validateUpdateUser } from '../../config/param-validation.mjs';
import userCtrl from './user.controller.mjs';

const userRoutes = express.Router();

userRoutes.get('/', userCtrl.list);
userRoutes.post('/', validate(validateCreateUser), userCtrl.create);
userRoutes.get('/:userId', userCtrl.get);
userRoutes.put('/:userId', validate(validateUpdateUser), userCtrl.update);
userRoutes.delete('/:userId', userCtrl.remove);

/** Load user when API with userId route parameter is hit */
userRoutes.param('userId', userCtrl.load);

export default userRoutes;
