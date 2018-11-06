'use strict';

var authRoutes = require('./authRoutes');
var userRoutes = require('./userRoutes');

module.exports = function route(app) {
  userRoutes(app);
  authRoutes(app);
};