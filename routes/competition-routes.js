const express = require('express');
const { param, query, body} = require('express-validator');

const CompetitonsController = require('../controllers/competitions');

const router = express.Router();

// GET v1/competitions
router.get('/competitions', [
    query('name')
        .trim()
        .isString()
        .customSanitizer((query) => {
            const stringfiedParam = query.toString().replace(/ /g, '');
            return stringfiedParam.toLowerCase();
        }),
    query('id')
        .isNumeric()
], CompetitonsController.getCompetition);

// GET v1/competitions/id
router.get('/competitions/:id',[
    param('id')
        .isNumeric()
], CompetitonsController.getCompetitionById);

module.exports = router;