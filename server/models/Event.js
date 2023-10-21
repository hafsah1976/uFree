const { Schema, model } = require('mongoose');

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
    availability: {
        type: Date,
    },
    code: {
        type: String,
    },
    thumbnail: {
        type: String,
    },

})


const Event = model('event', eventSchema);

module.exports = Event;
