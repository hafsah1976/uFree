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
        event: async (parent, { eventId }, context) => {
            const event = await Event
                .findOne({
                    _id: new ObjectId(eventId),
                    attendees: new ObjectId(context.user._id)
                })
                .populate('admin')
                .populate('attendees')
                .exec();

            if (!event) throw new Error(`Could not find event with ID ${eventId}!`);
            return event;

        },

        // finds the availabilities of a user
        availability: async (parent, { eventId }, context) => {
            const event = await Event.findOne({ _id: new ObjectId(eventId) }).populate('availabilities');
            console.log(`event: ${event}`);
            // const userAvail = event.availabilities.filter(availability => availability.userId == context.user._id);
            const userAvail = event.availabilities.find(a => a.userId == context.user._id);
            console.log(userAvail);
            return userAvail;
        },

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
        createEvent: async (parent, { name, location, week, description, thumbnail }, context) => {
            if (!context.user) {
                throw new AuthenticationError('You must be logged in to create an event');
            }

            const event = await Event.create({
                name: name,
                admin: context.user._id,
                location,
                week,
                description,
                thumbnail,
            });

            await User.findOneAndUpdate(
                { _id: context.user._id },
                {
                    $addToSet: {
                        events: event._id
                    }
                },
                { new: true }
                );

            await Event.findOneAndUpdate(
                { _id: event._id },
                {
                    $addToSet: {
                        attendees: context.user._id
                    }
                }
            );
            return event;
        },

        // join an event
        joinEvent: async (parent, { code }, context) => {
            if (context.user) {

                const event = Event.findOne({ code });
                // console.log(event._id);

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
                            events: updatedEvent._id
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

             // add logic to check if user is apart of event before adding availability
            //  console.log(event.attendees.includes(context.user._id));
             if (!(event.attendees.includes(context.user._id))) {
                throw new Error('You must be in this event to add your availability');

             }

            // check if user already has an availability, if so, prevent user from creating
            // another one
            // console.log(event.availabilities.length);
            for (let i = 0; i < event.availabilities.length; i++) {
                // console.log(event.availabilities[i].userId);
                if (event.availabilities[i].userId == context.user._id) {
                    throw new Error('You have already added your availability, please edit it instead');
                }
            }

            // add the availability object to the event's availabilities array
            event.availabilities.push({
                userId: context.user._id ,
                availabilities: availabilities
            });

            // save the updated event
            const updatedEvent = await event.save();

            return updatedEvent;
        },

        // edit your availability
        editAvailability: async (parent, { eventId, availabilities }, context) => {
            if (context.user) {
                // find event of availability you want to update
                const event = await Event.findOne({ _id: new ObjectId(eventId) });

                if (!event) {
                    throw new Error('Event not found');
                }

                // find availability of user and update it
                const userAvail = event.availabilities.find(a => a.userId == context.user._id);
                // console.log(userAvail);
                userAvail.availabilities = availabilities;

                // save the updated event
                const updatedAvailability = await event.save();

                return updatedAvailability;
            }

            throw new AuthenticationError('You must be logged in to update your availability');
        },

        // for admins only, delete an event
        deleteEvent: async (parent, { eventId }, context) => {
            if (context.user) {
                // find event by its id and check if it exists
                const event = await Event.findOne({ _id: new ObjectId(eventId) });

                if (!event) {
                    throw new Error('Event not found');
                }

                // check if user is admin
                if (event.admin != context.user._id) {
                    // console.log('You are not an admin: ', event.admin);
                    // console.log(context.user._id);
                    // console.log(context.user._id === event.admin);
                    throw new Error('Only admins can delete this event');
                }

                const deletedEvent = await Event.findOneAndDelete({ _id: new ObjectId(eventId) });

                // remove event from all user's event's array
                for (const userId of event.attendees) {
                    // console.log(userId);
                    // console.log(`Event to be removed: ${event}`);
                    // console.log(`attempting to remove event from  ${userId}'s events array`);

                    await User.findOneAndUpdate(
                        { _id: userId },
                        {
                            $pull: {
                                events: eventId
                            }
                        },
                        { new: true }
                    )
                    };

                if (!deletedEvent) {
                    throw new Error('Error deleting the event');
                }

                return deletedEvent;
            }

            throw new AuthenticationError('You must be logged in to delete an event');
        },
        // for attendees, leave an event
        leaveEvent: async (parent, { eventId }, context) => {
            if (context.user) {

                const event = await Event.findOne({ _id: new ObjectId(eventId) });
                const updatedEvent = await Event.findOneAndUpdate(
                    { _id: event._id },
                    {
                        $pull: {
                            attendees: context.user._id
                        },
                        $pull: {
                            availabilities: { userId: context.user._id }
                        }
                    },
                    { new: true } // return the updated event
                );

                // console.log('Removing event from user');

                await User.findOneAndUpdate(
                    { _id: context.user._id},
                    {
                        $pull: {
                            events: eventId
                        }
                    },
                    { new: true}
                );
                // console.log(updatedEvent);

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
