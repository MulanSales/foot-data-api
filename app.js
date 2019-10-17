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

const PORT = process.env.PORT || 3000;

var server = app.listen(PORT, () => {
    console.log(`Listening server on port ${PORT}`);
});

module.exports = {app, server};