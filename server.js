var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  User = require('./api/models/User'),
  bodyParser = require('body-parser'),
  jwt = require('jsonwebtoken'),
  config = require('./config')
  
mongoose.Promise = global.Promise;
mongoose.connect(config.database); 
app.set('superSecret', config.secret); // secret variable

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/'); //importing route
routes(app);

app.listen(port);

console.log('RESTful API server started on: ' + port);
