const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @typedef Info 
 * @property {string} applicationName.required
 * @property {string} createdBy.required
 * @property {string} description.required
 * @property {array} sections.required
 * @property {array} functionalities.required
 * @property {array} customerReviews.required
 * @property {array} competitions.required
 * @property {array} about.required
 * @property {array} players 
 */
const infoSchema = new Schema({
    applicationName: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    sections: {
        type: Array,
        required: true
    },
    functionalities: {
        type: Array,
        required: true
    },
    customerReviews: {
        type: Array,
        required: true
    },
    competitions: {
        type: Array,
        required: true
    },
    about: {
        type: Array,
        required: true
    },
    players: {
        type: Array,
        required: false
    }
});

module.exports = mongoose.model('Info', infoSchema);