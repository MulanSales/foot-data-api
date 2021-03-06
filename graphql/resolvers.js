const Info = require('../models/Info');
const { getResource } = require('../util/FootBallAPI');

module.exports = {
    getInfo: async function () {
        const info = await Info.findOne();

        const player = await getResource(['v2', 'players', 44]);
        info.examplePlayer = player;

        return info;
    } 
};