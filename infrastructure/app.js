const express = require('express');
require('express-async-errors');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');
const routes = require('../src/app/routes/index');
const { AppError } = require('../src/error/Errors');
require('dotenv').config();

const baseURLCors = process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',') : [];

global._ = require('lodash');

class App {
  server;
  constructor() {
    this.server = express();
    this.middlewares();
    this.router();
    this.errorMiddleware();
  }

  middlewares() {
    this.server.use(helmet());

    this.server.use(
        cors({
          origin: (origin, callback) => {
            if (baseURLCors.includes(origin) || !origin) {
              callback(null, true);
            } else {
              callback(new Error('Not allowed by CORS'));
            }
          },
          methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
          credentials: true,
          optionsSuccessStatus: 204,
          allowedHeaders: ['Content-Type', 'Authorization', 'X-Custom-Header'],
        }),
    );

    this.server.use(express.json());
    this.server.use(bodyParser.json());
    this.server.use(bodyParser.urlencoded({ extended: true }));

    this.server.use(
        '/api/v1/api-docs',
        swaggerUi.serve,
        swaggerUi.setup(swaggerSpec),
    );
  }

  router() {
    this.server.use('/api/v1', routes);
  }

  errorMiddleware() {
    this.server.use((error, request, response, next) => {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({
          status: 'error',
          message: error.message,
        });
      }

      return response.status(500).json({
        status: 'error',
        message: error.message,
      });
    });
  }
}

module.exports = new App();
