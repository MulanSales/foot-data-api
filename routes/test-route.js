const express = require('express');

const testController = require('../controllers/test');

const router = express.Router();

/**
 * This function comment is parsed by doctrine
 * @route GET /
 * @group  - Operations about us
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.get('/', testController.getTest);

module.exports = router;