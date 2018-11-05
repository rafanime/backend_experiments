'use strict';
module.exports = function(app) {
    var express = require('express');

    var auth = require('../controllers/authenticationController');
    var apiRoutes = express.Router(); 

    app.route('/authenticate')
    .post(auth.authenticateUser)

    apiRoutes.use(auth.checkToken); //oauth middleware
    app.use('/api', apiRoutes);

};
