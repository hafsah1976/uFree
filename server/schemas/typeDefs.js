const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Event {
    _id: ID
    name: String
    week: Date
    location: String
    description: String
    image: String
    availabilities: [UserAvailibilities]
  }

  type User {
    _id: ID
    username: String
    email: String
    events: [Event]

  }

  type UserAvailibilities {
    userId: ID
    availabilities: [DayAvailability]
  }

   type DayAvailability {
      day: String
      start: Number
      end: Number
    }

  type Query {
    user(username: String!): User
    event(eventId: ID!): Event
    availabilities(eventId: ID!): [UserAvailibilities] ###
    me(): User
  }


  type Mutation {
    signup(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createEvent(name: String!, location: String, description: String, week: Date, thumbnail: String): Event
    joinEvent(eventId: ID!, code: String!): Event
    addAvailibility(eventId: ID!, day: String!, start: String!, end: String!): UserAvailibilities
    editAvailability(eventId: ID!, day: String, start: String, end: String): UserAvailibilities ##
    deleteEvent(eventId: ID!): Event
    leaveEvent(eventId: ID!): Event
  }
`;

module.exports = typeDefs;
