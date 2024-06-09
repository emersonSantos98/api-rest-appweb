const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API RapidFunnels',
            description: 'API para o projeto RapidFunnels',
            version: '1.0.0',
            contact: {
                name: "rapidfunnels",
                email: "",
                url: "https://emersonsantos98.github.io/"
            }
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
