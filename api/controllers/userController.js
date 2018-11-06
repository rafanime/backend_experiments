import bcrypt from 'bcrypt';
import { User } from '../models';

const saltRounds = 10;

exports.list_all_users = (req, res) => {
  User.find({}, (err, user) => {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
};

exports.create_a_user = (req, res) => {
  const { password } = req.body;
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(password, salt, (hashError, hash) => {
      req.body.password = hash;
      const newUser = new User(req.body);

      newUser.save((saveError, user) => {
        if (saveError) {
          res.send(saveError);
        }
        res.json(user);
      });
    });
  });
};


exports.read_a_user = (req, res) => {
  User.findById(req.params.userId, (err, user) => {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
};


exports.update_a_user = (req, res) => {
  User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, (err, user) => {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
};


exports.delete_a_user = (req, res) => {
  User.remove({
    _id: req.params.userId,
  }, (err, user) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'user successfully deleted', user });
  });
};
