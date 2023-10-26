const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt'); // Require bcrypt to store and encrypt passwords

// Define the user schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Ensure usernames are unique
        trim: true, // Trim whitespace from usernames
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email addresses are unique
        match: [/.+@.+\..+/, 'Must match an email address'], // Validate email format
    },
    password: {
        type: String,
        required: true,
        minLength: 8, // Require a minimum password length of 8 characters
    },
    events: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Event', // Reference events using their ObjectIds
        }
    ],
});

// Middleware: Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltrounds = 10;
        this.password = await bcrypt.hash(this.password, saltrounds); // Hash the password
    }
    next();
});

// Method to verify a user's password
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password); // Compare provided password with hashed password
};

// Create the 'User' model using the schema
const User = model('user', userSchema);

module.exports = User; // Export the 'User' model
