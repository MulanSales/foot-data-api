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
            userId: result._id.toString()
        });

        return result;

    } catch (err) {
        ErrorHandling.handleAsyncError(err, next);
        return err;
    };
};

/**
 * @typedef GetTokenRequest 
 * @property {string} email.required
 * @property {string} password.required
 */

/**
 * @typedef GetTokenResponse
 * @property {string} message
 * @property {string} userId
 */

/**
 * Gets Json web token for authenticated must tasks 
 * @route POST /token
 * @group authentication
 * @param {GetToken.model} request.body.required
 * @returns {GetTokenResponse} 200 - An object with token for authenticated tasks
 * @returns {Error}  default - Unexpected error
 */
exports.getToken = async (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;

    try {

        const user = await User.findOne({email: email});
        if (!user) {
            ErrorHandling.handleError('A user with this email could not be found', 401);
        };

        const isUserValid = await bcrypt.compare(password, user.password);
        if (!isUserValid) {
            ErrorHandling.handleError('Password is incorrect', 401);
        };

        const token = jwt.sign({
            email: user.email,
            userId: user._id.toString()
        }, process.env.JWT_SECRET_KEY, { expiresIn: '2h' });

        res.status(200).json({
            token: token,
            userId: user._id.toString()
        });

    } catch (err) {
        ErrorHandling.handleAsyncError(err, next);
        return err;
    }

}