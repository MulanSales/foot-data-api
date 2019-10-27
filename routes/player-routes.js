const express = require('express');

const PlayerController = require('../controllers/player');

const router = express.Router();

// GET v1/player
router.get('/player/:id', PlayerController.getPlayer);

module.exports = router;