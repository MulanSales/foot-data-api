const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// BodyParser: Parses requests to json format
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    try {
        res
            .status(200)
            .json({
                message: "Configuring CI/CD"
            });
    } catch(err) {
        console.log(err);
    }

});

const PORT = process.env.PORT || 3000;

var server = app.listen(PORT, () => {
    console.log(`Listening server on port ${PORT}`);
});

module.exports = {app, server};