const path = require('path');

const swaggerFileGenerator = (app, port, host) => {
    const expressSwagger = require('express-swagger-generator')(app);

    let swaggerOptions = {
        swaggerDefinition: {
            info: {
                description: 'FootData API',
                title: 'Swagger',
                version: '1.0.0',
            },
            host: `${host}:${port}`,
            basePath: '/v1',
            produces: [
                "application/json",
                "application/xml"
            ],
            schemes: ['https', 'http'],
            securityDefinitions: {
                JWT: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'Authorization',
                    description: "",
                }
            }
        },
        basedir: path.join(__dirname, '../'),
        files: ['./controllers/*.js', './models/*.js', './app.js']
    };

    expressSwagger(swaggerOptions);
}

module.exports = { swaggerFileGenerator };
