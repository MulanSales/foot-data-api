const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const ErrorHandling = require('../models/ErrorHandling');
const User = require('../models/User');

/**
 * @typedef SignupResponse
 * @property {string} message
 * @property {string} userId
 */

/**
 * Sign ups a new user to the application
 * @route PUT /signup
 * @group authentication
 * @param {User.model} request.body.required
 * @returns {SignupResponse} 200 - An object with informations of the application 
 * @returns {Error}  default - Unexpected error
 */
exports.signup = async (req, res, next) => {

    const errors = validationResult(req);

    try {
        if (!errors.isEmpty()) {
            ErrorHandling.handleError('Validation failed.', 422, errors.array());
        }
      
        const email = req.body.email;
        const name = req.body.name;
        const password = req.body.password;

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
            email: email,
            password: hashedPassword,
            name: name
        })

        const result = await user.save();
        res.status(201).json({
            message: 'User created with success',
            userId: result._id
        });

        return result;

    } catch (err) {
        ErrorHandling.handleAsyncError(err, next);
        return err;
    };
};