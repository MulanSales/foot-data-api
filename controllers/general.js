const { getResource } = require('../util/football-api-request');
const Info = require('../models/Info');

/**
 * Get general informations about the application
 * @route GET /info
 * @returns {Info} 200 - An object with informations of the application 
 * @returns {Error}  default - Unexpected error
 */
exports.getInfo = async (req, res, next) => {

    const info = await Info.findOne();

    const player = await getResource(['v2', 'players', 44]);

    info.examplePlayer = player;

    return res.status(200).json(info);
};

