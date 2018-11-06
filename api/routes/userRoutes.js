import * as user from '../controllers/userController';

module.exports = (app) => {
  app.route('/api/users')
    .get(user.list_all_users)
    .post(user.create_a_user);


  app.route('/api/users/:userId')
    .get(user.read_a_user)
    .put(user.update_a_user)
    .delete(user.delete_a_user);
};
