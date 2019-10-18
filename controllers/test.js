
exports.getTest = (req, res, next) => {
    try {
        res
            .status(200)
            .json({
                message: "Configuring CI/CD"
            });
    } catch(err) {
        console.log(err);
    }
};