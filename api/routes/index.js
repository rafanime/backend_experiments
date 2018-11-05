const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');

module.exports = function(app) {
    userRoutes(app);
    authRoutes(app);
}