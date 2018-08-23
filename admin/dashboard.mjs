import User from '../models/user.model.mjs';

async function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  try {
    const users = await User.list({ limit, skip });
    res.render('index', users);
  } catch (err) {
    next(err);
  }
}

const dashboard = { list };
export default dashboard;

