import httpStatus from 'http-status';
import APIError from '../../helpers/APIError.mjs';
import User from '../../models/user.model.mjs';

/**
 * Load user and append to req.
 */
async function load(req, res, next, id) {
  try {
    req.user = await User.get(id);
    if (!req.user) {
      return next(new APIError('Not Found', httpStatus.NOT_FOUND, true));
    }
    return next();
  } catch (err) {
    return next(err);
  }
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
  return res.status(200).json(req.user);
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
async function create(req, res, next) {
  const user = new User({
    username: req.body.username,
    mobileNumber: req.body.mobileNumber,
    email: req.body.email
  });
  try {
    const savedUser = await user.save();
    res.status(httpStatus.CREATED).json(savedUser);
  } catch (err) {
    next(err);
  }
}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
async function update(req, res, next) {
  let user = req.user;
  user.username = req.body.username;
  user.mobileNumber = req.body.mobileNumber;
  try {
    user = await user.save();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
async function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  try {
    const users = await User.list({ limit, skip });
    res.status(httpStatus.OK).json(users);
  } catch (err) {
    next(err);
  }
}

/**
 * Delete user.
 * @returns {User}
 */
async function remove(req, res, next) {
  let user = req.user;
  try {
    user = await user.remove();
    res.status(httpStatus.OK).json(user);
  } catch (err) {
    next(err);
  }
}

const userCtrl = { load, get, create, update, list, remove };
export default userCtrl;
