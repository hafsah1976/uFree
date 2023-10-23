const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt'); // require bcrypt to store and encrypt passwords


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
    events: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Event',
        }
    ],
});

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltrounds = 10;
        this.password = await bcrypt.hash(this.password, saltrounds);
    }

    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('user', userSchema);

module.exports = User;
