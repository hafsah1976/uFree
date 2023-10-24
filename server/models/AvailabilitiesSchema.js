const { Schema } = require('mongoose');

// availabilities through the week for one user
const availabilitiesSchema = new Schema({
    // connect user data
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    // array of availability objects
    availabilities: [{
        day: {
            type: String,
            required: true,
        },
        start: {
            type: Number,
            default: 0,
        },
        end: {
            type: Number,
            default: 0,
        }
    }],
})

module.exports = availabilitiesSchema;