const { AuthenticationError } = require('apollo-server-express');
const { User, Event, AvailabilitiesSchema } = require('../models');
const { ObjectId } = require('mongoose').Types;
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // finds a specific user depending on the username and shows
        // the user's events
        user: async (parent, { username }) => {
            return await User.findOne({ username }).populate('events').exec();
        },

        // finds an event by the eventId
        event: async (parent, { eventId }) => {
            console.log('find event resolver executed!');
            const event = await Event.findOne({ _id: new ObjectId(eventId)});
            console.log(event);
            return event;

        },

        // finds the availabilities of an event
        // availabilities: async (parent, { eventId }) => {
        //     const event = await Event.findOne({ _id: eventId }).populate('availabilities');
        //     return event.availabilities;
        // },

        // displays the current logged in user's info
        me: async (parent, args, context) => {
            if (context.user) {
                return await User.findOne({ _id: context.user._id }).populate('events');
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
        createEvent: async (parent, { name }, context) => {
            if (context.user) {
                const event = await Event.create({ name: name, admin: context.user._id});

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    {
                        $addToSet: {
                            events: event._id
                        }
                    },
                    { new: true }
                    )

                return event;
            }

            throw new AuthenticationError('You must be logged in to create an event');
        },

        // join an event
        joinEvent: async (parent, { code }, context) => {
            if (context.user) {

                const event = Event.findOne({ code });
                console.log(event._id);

                if (!event) {
                    throw new Error('Event not found or incorrect access code');
                }

                // if event is found and access code is correct, add user to attendees array
                const updatedEvent = await Event.findOneAndUpdate(
                    { code },
                    {
                        $addToSet: {
                            attendees: context.user._id
                        }
                    },
                    { new: true }

                );

                // add event to user's events array
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    {
                        $addToSet: {
                            events: event._id
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
        addAvailability: async (parent, { eventId, availabilities }, context) => {
            if (!context.user) {
                throw new AuthenticationError('You must be logged in to add your availability to an event');
            }

            // find event by its id
            const event = await Event.findOne({ _id: new ObjectId(eventId) });

            if (!event) {
                throw new Error('Event not found');
            }

            // add the availability object to the event's availabilities array
            event.availabilities.push(availabilities);

            // save the updated event
            const updatedEvent = await event.save();

            return updatedEvent;
        },

        // edit your availability
        editAvailability: async (parent, { eventId, availabilities }, context) => {
            if (context.user) {
                // find event of availability you want to update
                const eventAvailability = await Event.findOne({ _id: eventId });

                if (!eventAvailability) {
                    throw new Error('Event not found');
                }

                // update the availability fields if new values are provided
                if (day) {
                    eventAvailability.day = day;
                }
                if (start) {
                    eventAvailability.start = start;
                }
                if (end) {
                    eventAvailability.end = end;
                }
                // save the updated event
                const updatedAvailability = await eventAvailability.save();

                return updatedAvailability;
            }

            throw new AuthenticationError('You must be logged in to update your availability');
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
                            attendees: { _id: context.user._id }
                        }
                    },
                    { new: true } // return the updated event
                );

                if (!updatedEvent) {
                    throw new Error('Event not found');
                }

                return 'you have left the event';
            }


            throw new AuthenticationError('You must be logged in to leave an event');
        },
    },
}

module.exports = resolvers;
