const express = require('express');

const generalController = require('../controllers/general');

const router = express.Router();

// GET v1/info
router.get('/info', generalController.getInfo);

module.exports = router;