const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const mongoose = require('mongoose');
const swaggerUi = require('express-swaggerize-ui');

const graphqlHttp = require('express-graphql');
const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

const { swaggerFileGenerator } = require('./util/swagger-generator');

const generalRoutes = require('./routes/general-route');

const app = express();

const PORT = process.env.PORT || 3000;
const MONGODB_URI =`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@nodecourse-tnt0c.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;

let server;

// BodyParser: Parses requests to json format
app.use(bodyParser.json());

app.use('/v1', generalRoutes);
/**
 * Graphql endpoint
 * @route POST /graphql
 * @returns {Info} 200 - An object with informations of the application 
 * @returns {Error}  default - Unexpected error
 */
app.use('/graphql', graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true 
}));

app.use(compression());

swaggerFileGenerator(app, PORT, process.env.HOST);

app.use('/api-docs.json', (req, res) => {
    res.json(require('./api-docs.json'));
});

app.use('/api-docs', swaggerUi());

mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        server = app.listen(PORT, () => {
            console.log(`Listening server on port ${PORT}`);
        });
    })
    .catch(err => {
        console.log(err);
    });

module.exports = {app, server};