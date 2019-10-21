// External Imports
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const mongoose = require('mongoose');
const swaggerUi = require('express-swaggerize-ui');

const graphqlHttp = require('express-graphql');
const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

// Local Imports
const { swaggerFileGenerator } = require('./util/swagger-generator');

// Routers
const generalRoutes = require('./routes/general-route');

// Express App Initialization
const app = express();

// Other Variables
const PORT = process.env.PORT || 3000;
const MONGODB_URI =`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@nodecourse-tnt0c.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;

// BodyParser: Parses requests to json format
app.use(bodyParser.json());

// General Controller Router
app.use('/v1', generalRoutes);

/**
 * Graphql endpoint
 * @route POST /graphql
 * @group graphql
 * @param {Graphql.model} request.body.required
 * @returns {Error}  default - Unexpected error
 */
app.use('/v1/graphql', graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true 
}));

// Compression of files
app.use(compression());

// Swagger function to generate api-docs.json locally
swaggerFileGenerator(app, process.env.HOST);

// Swagger UI related middlewares
app.use('/api-docs.json', (req, res) => {
    res.json(require('./api-docs.json'));
});

app.use('/', swaggerUi());

// Error Handling Middleware
app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message;

    let data = '';
    if (error.data) {
        data = error.data;
    }

    res.status(statusCode).json({
        message: message,
        data: data
    });

});

// Moongose connection and server initialization
mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        const server = app.listen(PORT, () => {
            console.log(`Listening server on port ${PORT}`);
        });
    })
    .catch(err => {
        console.log(err);
    });