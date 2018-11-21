import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as config from '../../config';
import { User } from '../models';

exports.authenticateUser = (req, res) => {
  User.findOne({
    email: req.body.email,
  }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      // check if password matches
      bcrypt.compare(req.body.password, user.password, (compareError, validPassword) => {
        if (compareError) {
          res.json({ success: false, message: 'Failed to authenticate.' });
        }
        if (!validPassword) {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {
          // if user is found and password is right
          // create a token with only our given payload
          // we don't want to pass in the entire user since that has the password
          const payload = {
            admin: user.admin,
          };
          const token = jwt.sign(payload, config.secret, {
            expiresIn: 86440, // expires in 24 hours
          });
          res.json({
            success: true,
            message: 'Enjoy your token!',
            data: {
              token,
              user,
            },
          });
        }
      });
    }
  });
};

exports.checkToken = (req, res, next) => {
// check header or url parameters or post parameters for token
  const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization;
  // decode token
  if (token) {
  // verifies secret and checks exp
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) return res.json({ success: false, message: 'Failed to authenticate token.' });

      // if everything is good, save to request for use in other routes
      req.decoded = decoded;
      next();
      return 'fds';
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.',
    });
  }
};
