const express = require('express');
const { body } = require('express-validator');

const authController = require('../controllers/auth');

const User = require('../models/User');

const router = express.Router();

// PUT v1/signup
router.put('/signup', [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .custom((value, {req}) => {
            return User.findOne({email: value})
                .then(userDoc => {
                    if (userDoc) {
                        return Promise.reject('E-mail address already exists!');
                    }
                });
        })
        .trim()
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({min: 8})
        .withMessage('Please enter a valid password.')
        .custom((value, {req}) => {
            const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/;
              if (!re.test(value)) {
                  return Promise.reject('Password must contain at least one letter, one upper case letter, one special character and one number');
              }
              return true;
        }),
    body('confirmPassword')
        .trim()
        .custom((value, {req}) => {
            if (value.toString() !== req.body.password.toString()) {
                throw new Error(`Password and confirmation password doesn't match`);
            }
            return true;
        }),
    body('name', 'Please enter a valid name')
        .isString()
        .isLength({max: 50})
], authController.signup);

//POST /v1/token
router.post('/token', [
    body('email')
        .isEmail()
        .trim(),
    body('password', 'Password does not match format criteria')
        .trim()
        .isLength({min: 8})
], authController.getToken);

module.exports = router;