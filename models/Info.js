const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @typedef Info 
 * @property {string} applicationName.required
 * @property {string} createdBy.required
 * @property {string} description.required
 * @property {object} players 
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
    players: {
        type: Array,
        required: false
    }
});

module.exports = mongoose.model('Info', infoSchema);