const FootBallAPI = require('../util/FootBallAPI');
const ErrHandling = require('../models/ErrorHandling');
const Competition = require('../models/Competition');

/**
 * Gets a competition given an id or name
 * @route GET /competitions
 * @group foot data
 * @param {number} id.query
 * @param {string} name.query
 * @returns {Error}  default - Unexpected error
 */
exports.getCompetition = async (req, res, next) => {
  
    let result;

    try {

        if (req.query.id) {
            result = await getCompetitionById(req.query.id);   
        }
        else if (req.query.name) {
            result = await getCompetitionByName(req.query.name);
        }
        else if (!req.query.name) {
            const standardCompetitionId = 2001;
    
            result = await FootBallAPI.getResource(['v2', 'competitions', standardCompetitionId]);
            
            if (result.error) {
                ErrHandling.handleError(result.message, result.error);
            }
        } 
        else {
            ErrHandling.handleError('Resource requested is not acceptable', 405);            
        }
        
        res.status(200).json(result);

    } catch(err) {
        ErrHandling.handleAsyncError(err, next);
        return err;
    };
};

exports.getCompetitionById = async (req, res, next) => {
    const id = req.params.id;

    try {
        const result = await getCompetitionById(id);

        res.status(200).json(result);
    }
    catch (err) {
        ErrHandling.handleAsyncError(err, next);
        return err;
    };
};

/**
 * Get a competition's complete summary
 * @route GET /competition
 * @group foot data
 * @param {number} id.query
 * @returns {Error}  default - Unexpected error
 */
exports.getCompleteCompetition = async (req, res, next) => {

    const id = req.query.id || req.params.id;

    try {
        const competition = await FootBallAPI.getResource(['v2', 'competitions', id]);

        const matches = await FootBallAPI.getResource(['v2', 'competitions', id, 'matches']);

        const standings = await FootBallAPI.getResource(['v2', 'competitions', id, 'standings']);

        const result = new Competition(competition, matches, standings);

        res.status(200).json(result);

    }
    catch (err) {
        ErrHandling.handleAsyncError(err, next);
        return err;
    }
};

/**
 * Gets Macthes given a competition's id number
 * @route GET /competitions/matches
 * @group foot data
 * @param {number} id.query
 * @returns {Error}  default - Unexpected error
 */
exports.getCompetitionMatchesById = async (req, res, next) => {
    const id = req.query.id || req.params.id;

    try {
        const result = await FootBallAPI.getResource(['v2', 'competitions', id, 'matches']);
        
        return res.status(200).json(result);
    }
    catch (err) {
        ErrHandling.handleAsyncError(err, next);
        return err;
    }
};

// Local utility functions

const getCompetitionById = async id => {
    const result = await FootBallAPI.getResource(['v2', 'competitions', id]);

    if (result.error) {
        ErrHandling.handleError(result.message, result.error);
    };

    return result;
};

const getCompetitionByName = async name => {

    const nameRegex = RegExp(name);

    const doc = await FootBallAPI.getResource(['v2', 'competitions']);

    if (doc.error) {
        ErrHandling.handleError(competitionDoc.message, competitionDoc.error);
    }

    const comps = doc.competitions.filter(comp => {
        const name = comp.name.toLowerCase().replace(/ /g, '');

        if (nameRegex.test(name)) {
            return comp;
        }
    });

    if (comps.length === 0) {
        ErrHandling.handleError('There is no match for the param requested', 404);
    }

    return comps;
}