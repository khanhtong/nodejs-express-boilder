import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import APIError from '../../helpers/APIError.mjs';
import { jwtSecret } from '../../config/config.mjs';
import UserModule from '../../models/user.model.mjs';

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
async function login(req, res, next) {
  try {
    const user = await UserModule.findOne({ username: req.body.username });
    if (!user) {
      return (next(new APIError('Authentication error', httpStatus.UNAUTHORIZED, true)));
    }
    const isAuthenticate = await user.authenticate(req.body.password);
    if (isAuthenticate) {
      const token = jwt.sign({
        _id: user._id,
        username: user.username
      }, jwtSecret);
      return res.json({ token });
    }
    return (next(new APIError('Authentication error', httpStatus.UNAUTHORIZED, true)));
  } catch (err) {
    return next(err);
  }
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
  // req.user is assigned by jwt middleware if valid token is provided
  return res.json({
    user: req.user,
    num: Math.random() * 100
  });
}
const authCtrl = { login, getRandomNumber };
export default authCtrl;
