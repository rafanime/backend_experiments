'use strict';

var bcrypt = require('bcrypt');
var mongoose = require('mongoose'),
    User = mongoose.model('Users'),
    saltRounds = 10;

exports.list_all_users = function (req, res) {
  User.find({}, function (err, user) {
    if (err) res.send(err);
    res.json(user);
  });
};

exports.create_a_user = function (req, res) {
  var password = req.body.password;
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      req.body['password'] = hash;
      var new_user = new User(req.body);

      new_user.save(function (err, user) {
        if (err) res.send(err);
        res.json(user);
      });
    });
  });
};

exports.read_a_user = function (req, res) {
  user.findById(req.params.userId, function (err, user) {
    if (err) res.send(err);
    res.json(user);
  });
};

exports.update_a_user = function (req, res) {
  user.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, function (err, user) {
    if (err) res.send(err);
    res.json(user);
  });
};

exports.delete_a_user = function (req, res) {

  user.remove({
    _id: req.params.userId
  }, function (err, user) {
    if (err) res.send(err);
    res.json({ message: 'user successfully deleted' });
  });
};