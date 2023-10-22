const { Schema, model } = require('mongoose');
const availabilitiesSchema = require('./AvailabilitiesSchema');
const generateCode = require('../utils/generateCode');

const CODE_LENGTH = 8;

// The event schema has the following fields:
// name, admin, location, description, attendees, week, availability, code(event code), and thumbnail
const eventSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    admin: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    location: {
        type: String,
    },
    description: {
        type: String,
    },
    attendees: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    week: {
        type: Date,

    },
    availabilities: [availabilitiesSchema],
    code: {
        type: String,
        default: generateCode(CODE_LENGTH),
    },
    thumbnail: {
        type: String,
    },

})


const Event = model('event', eventSchema);

module.exports = Event;
