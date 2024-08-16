const express = require('express');
const cors = require('cors');
const passport = require('passport');
const routes = require('../src/app/routes');
require('dotenv').config();
const cookieSession = require('cookie-session');
const passportStrategy = require('../passport');
const helmet = require('helmet');
const bodyParser = require('body-parser');
global._ = require('lodash');
const baseURLCors = 'http://localhost:5173';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(
      cookieSession({
        name: 'session',
        keys: ['cyberwolve'],
        maxAge: 24 * 60 * 60 * 100,
      }),
    );
    this.server.use(
      cors({
        origin: baseURLCors,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        optionsSuccessStatus: 204,
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Custom-Header'],
      }),
    );
    this.server.use(passport.initialize());
    this.server.use(passport.session());
    this.server.use(helmet());
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App();
