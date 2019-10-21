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
              const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
              if (!re.test(value)) {
                  return Promise.reject('Password must contain at least one letter and one special character.');
              }
        }),
    body('confirmPassword')
        .custom((value, {req}) => {
            if (value !== req.body.password) {
                return Promise.reject(`Password and confirmation password doesn't match`);
            }
        }),
    body('name', 'Please enter a valid name')
        .isString()
        .isEmpty()
], authController.signup);

module.exports = router;