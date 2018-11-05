var userRoutes = require('./userRoutes');
var authRoutes = require('./authRoutes');

module.exports = function(app) {
    userRoutes(app);
    authRoutes(app);
}