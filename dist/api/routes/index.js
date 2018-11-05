'use strict';

var authRoutes = require('./authRoutes');
var userRoutes = require('./userRoutes');

module.exports = function (app) {
    userRoutes(app);
    authRoutes(app);
};