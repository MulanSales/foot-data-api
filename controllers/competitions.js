const FootBallAPI = require('../util/FootBallAPI');
const ErrHandling = require('../models/ErrorHandling');
/**
 * Sign ups a new user to the application
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