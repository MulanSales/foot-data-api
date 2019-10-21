const FootBallAPI = require('../util/FootBallAPI');
const Info = require('../models/Info');
const ErrHandling = require('../models/ErrorHandling');

/**
 * Get general informations about the application
 * @route GET /info
 * @group general
 * @returns {Info} 200 - An object with informations of the application 
 * @returns {Error}  default - Unexpected error
 */
exports.getInfo = async (req, res, next) => {

    try {
        const info = await Info.findOne(); 
        
        if (!info) {
            ErrHandling.handleError('Resource not found', 404);
        }
        const player = await FootBallAPI.getResource(['v2', 'players', 44]);
   
        info.examplePlayer = player ? player : null;
    
        res.status(200).json(info);
        return info;

    } catch(err) {
        ErrHandling.handleAsyncError(err, next);
        return err;
    }

};

