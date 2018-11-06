import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import * as config from './config';
import routes from './api/routes';

const app = express();
const port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.connect(config.database);
app.set('superSecret', config.secret); // secret variable

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.listen(port);

console.log('RESTful API server started on: ', port);
