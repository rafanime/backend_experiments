'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (app) {
  var auth = '../controllers/authenticationController';
  var apiRoutes = _express2.default.Router();

  app.route('/authenticate').post(auth.authenticateUser);

  apiRoutes.use(auth.checkToken);
  app.use('/api', apiRoutes);
};