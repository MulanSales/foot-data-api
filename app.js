const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');

const testRoutes = require('./routes/test-route');

const app = express();

//const expressSwagger = require('express-swagger-generator')(app);
const swaggerUi = require('express-swaggerize-ui');

// BodyParser: Parses requests to json format
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

//let swaggerOptions = {
    //swaggerDefinition: {
        //info: {
            //description: 'This is a sample server',
            //title: 'Swagger',
            //version: '1.0.0',
        //},
        //host: `localhost:${PORT}`,
        //basePath: '/v1',
        //produces: [
            //"application/json",
            //"application/xml"
        //],
        //schemes: ['http', 'https'],
        //securityDefinitions: {
            //JWT: {
                //type: 'apiKey',
                //in: 'header',
                //name: 'Authorization',
                //description: "",
            //}
        //}
    //},
    //basedir: __dirname,
    //files: ['./routes/*.js']
//};

//expressSwagger(swaggerOptions);

app.use('/api-docs.json', (req, res) => {
    res.json(require('./swagger/v1/api-docs.json'));
});

app.use('/api-docs', swaggerUi());

app.use('/v1', testRoutes);

app.use(compression());

var server = app.listen(PORT, () => {
    console.log(`Listening server on port ${PORT}`);
});

module.exports = {app, server};