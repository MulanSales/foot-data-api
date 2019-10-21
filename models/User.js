const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @typedef User
 * @property {string} email.required
 * @property {string} password.required
 * @property {string} confirmPassword.required
 * @property {string} name.required
 */
const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);