const { Schema, model } = require('mongoose');
const bcrypt = require('bcyrpt'); // require bcrypt to store and encrypt passwords


// The user schema has the following fields:
// username, email, password, firstName, lastName, events, & availability
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address'],
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    events: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Event',
        }
    ],
    availability: {
        type: Date,
    },
});

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltrounds = 10;
        this.password = await bcrypt.has(this.password, saltrounds);
    }

    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('user', userSchema);

module.exports = User;
