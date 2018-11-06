import express from 'express';
import * as auth from '../controllers/authenticationController';

module.exports = (app) => {
  const apiRoutes = express.Router();

  app.route('/authenticate')
    .post(auth.authenticateUser);

  apiRoutes.use(auth.checkToken);
  app.use('/api', apiRoutes);
};
