const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @typedef Info 
 * @property {string} applicationName.required
 * @property {string} createdBy.required
 * @property {string} description.required
 * @property {object} examplePlayer
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
    examplePlayer: {
        type: Object,
        required: false
    }
});

module.exports = mongoose.model('Info', infoSchema);