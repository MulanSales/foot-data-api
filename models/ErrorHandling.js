
const ErrHandling = class {

    static handleAsyncError(err, nextFunc, statusCode) {
        if (!err.statusCode) {
            err.statusCode = statusCode;
        }

        nextFunc(err);
    }

    static handleError(message, statusCode, errors) {
        const error = new Error(message);
        error.statusCode = statusCode;

        if (errors && errors.length > 0) {
            error.data = errors;
        };

        throw error;
    }
}

module.exports = ErrHandling;