const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const { Http2ServerRequest } = require('http2');
const jwtStrategy = require('./auth/jwtStrategy.auth');

//Basic Meta information
const options = {
    definition: {
        openapi: "3.0.0",
        info: {title: "Personal Finances API", version: "1.0.0"},
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            },
        }
    },
    servers: [
        {
            url: "http://localhost:3000"
        }
    ],
    apis: [`${path.join(__dirname, "./routes/*.js")}`]
}

//Docs in JSON format
const swaggerSpec = swaggerJSDoc(options);

//Set up documnetation
const swaggerDocs = (app, port)=>{
    app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/api/v1/docs.json', (req, res)=>{
        res.setHeader('Content-type', 'application/json');
        res.send(swaggerSpec);
    });
    console.log(`API docs are available on http://localhost:${port}/api/v1/docs`);
}

module.exports = {swaggerDocs};