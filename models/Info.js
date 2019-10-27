const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @typedef Info 
 * @property {string} applicationName.required
 * @property {string} createdBy.required
 * @property {string} description.required
 * @property {[string]} sections.required
 * @property {[string]} functionalities.required
 * @property {[object]} customerReviews.required
 * @property {[string]} competitions.required
 * @property {[string]} about.required
 * @property {[object]} players 
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