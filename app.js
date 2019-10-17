const express = require('express');

const app = express();

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

var server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Running server on port ${process.env.PORT || 3000}`);
});

module.exports = {app, server};