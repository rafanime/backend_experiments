const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');

module.exports = function route(app) {
  authRoutes(app);
  userRoutes(app);
};
