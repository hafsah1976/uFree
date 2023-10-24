const { AuthenticationError } = require('apollo-server-express');
const { User, Event, AvailabilitiesSchema } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // finds a specific user depending on the username and shows
        // the user's events
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('events');
        },

        // finds an event by the eventId
        event: async (parent, { eventId }) => {
            return Event.findOne({ _id: eventId});

        },

        // finds the availabilities of an event
        availabilities: async (parent, { eventId }) => {

        },

        // displays the current logged in user's info
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('events');
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },


    Mutation: {
        // create a new account
        signup: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        // login to the website
        login: async (parent, { email, password}) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        // create a new event
        createEvent: async (parent, { eventName }, context) => {
            if (context.user) {
                const event = await Event.create({ name: eventName, admin: context.user._id});

                return event;
            }

            throw new AuthenticationError('You must be logged in to create an event');
        },
        // join an event
        joinEvent: async () => {

        },
        // add your availability to an event
        addAvailability: async () => {

        },
        // edit your availability
        editAvailability: async () => {

        },
        // for admins only, delete an event
        deleteEvent: async () => {

        },
        // for attendees, leave an event
        leaveEvent: async () => {

        },
    },
}

module.exports = resolvers;
