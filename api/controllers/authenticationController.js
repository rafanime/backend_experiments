'use strict';
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = mongoose.model('Users')


const config = require('../../config')

exports.authenticateUser = function(req, res) {
    User.findOne({
        name: req.body.name
      }, function(err, user) {
    
        if (err) throw err;
    
        if (!user) {
          res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
    
          // check if password matches

            bcrypt.compare(req.body.password, user.password, function(err, validPassword) {
                if(!validPassword) {
                    res.json({ success: false, message: 'Authentication failed. Wrong password.' });

                } else {
        
                // if user is found and password is right
                // create a token with only our given payload
                // we don't want to pass in the entire user since that has the password
                const payload = {
                admin: user.admin     };
                    var token = jwt.sign(payload, config.secret, {
                    expiresIn: 86440 // expires in 24 hours
                    });
            
                    // return the information including token as JSON
                    res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                    });
                }
            }); 
        }
    
      });
}

exports.checkToken = function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];
  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {       if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });       } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;         next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });

  }


}

