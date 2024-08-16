const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API REST - FASTSELLER',
      description: 'API REST - FASTSELLER - Documentação',
      version: '1.0.0',
      contact: {
        name: 'API REST - FASTSELLER',
        email: '',
        url: 'https://emersonsantos98.github.io/',
      },
    },

    servers: [
      {
        url: `${process.env.BASE_URL}`,
      },
    ],
  },
  apis: ['./Api/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
