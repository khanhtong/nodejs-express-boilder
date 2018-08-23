/* eslint-disable new-cap */
import express from 'express';
import userRoutes from './user/user.route.mjs';
import authRoutes from './auth/auth.route.mjs';

// TODO: use glob to match *.route files
const apiRouter = express.Router();

/** GET /health-check - Check service health */
apiRouter.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
apiRouter.use('/users', userRoutes);

// mount auth routes at /auth
apiRouter.use('/auth', authRoutes);

export default apiRouter;
