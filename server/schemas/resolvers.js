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
            return User.findOne({ _id: eventId }).populate('availabilities');
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
        joinEvent: async (parent, { code, eventId }, context) => {
            if (context.user) {

                const event = Event.findOne({ _id: eventId, code });

                if (!event) {
                    throw new Error('Event not found or incorrect access code');
                }

                // if event is found and access code is correct, add user to attendees array
                const updatedEvent = await Event.findOneAndUpdate(
                    {_id: eventId},
                    {
                        $addToSet: {
                            attendees: context.user._id
                        }
                    },
                    { new: true }

                );

                if (!updatedEvent) {
                    throw new Error('Event not found')
                }

                return updatedEvent;
            }

            throw new AuthenticationError('You must be logged in join an event');
        },
        // add your availability to an event
        addAvailability: async (parent, { day, start, end, eventId }, context) => {
            if (context.user) {
                // create an availability object with day, start, and end
                const availability = { day, start, end };

                // find event by its id
                const event = await Event.findOne({ _id: eventId });

                if (!event) {
                    throw new Error('Event not found');
                }

                // add the availability object to the event's availabilities array
                event.availabilities.push(availability);

                // save the updated event
                const updatedEvent = await event.save();

                return updatedEvent;
            }

            throw new AuthenticationError('You must be logged in to add your availability to an event');
        },
        // edit your availability
        editAvailability: async (parent, { day, start, end, eventId }, context) => {
            if (context.user) {
                // create an availability object with day, start, and end
                const availability = { day, start, end };

                // find event by its id
                const event = await Event.findOne({ _id: eventId });

                if (!event) {
                    throw new Error('Event not found');
                }

                // add the availability object to the event's availabilities array
                event.availabilities.push(availability);

                // save the updated event
                const updatedEvent = await event.save();

                return updatedEvent;
            }

            throw new AuthenticationError('You must be logged in to add your availability to an event');
        },
        // for admins only, delete an event
        deleteEvent: async (parent, { eventId, }, context) => {
            if (context.user) {
                // find event by its id and check if it exists
                const event = await Event.findOne({ _id: eventId });

                if (!event) {
                    throw new Error('Event not found');
                }

                // check if user is admin
                if (event.admin !== context.user._id) {
                    throw new Error('Only admins can delete this event');
                }

                const deletedEvent = await Event.findOneAndDelete({ _id: eventId });

                if (!deletedEvent) {
                    throw new Error('Error deleting the event');
                }

                return 'Event deleted successfully';
            }

            throw new AuthenticationError('You must be logged in to delete and event');
        },
        // for attendees, leave an event
        leaveEvent: async (parent, { eventId }, context) => {
            if (context.user) {
                const updatedEvent = await Event.findOneAndUpdate(
                    { _id: eventId },
                    {
                        $pull: {
                            attendees: { username: context.user.username }
                        }
                    },
                    { new: true } // return the updated event
                );

                if (!updatedEvent) {
                    throw new Error('Event not found');
                }

                return updatedEvent;
            }


            throw new AuthenticationError('You must be logged in to leave an event');
        },
    },
}

module.exports = resolvers;
