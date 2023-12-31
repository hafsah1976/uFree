const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Event {
    _id: ID
    name: String
    week: String
    location: String
    description: String
    thumbnail: String
    code: String
    admin: User
    attendees: [User]
    availabilities: [UserAvailabilities]
  }

  type User {
    _id: ID
    username: String
    email: String
    events: [Event]

  }

  type UserAvailabilities {
    userId: ID
    availabilities: [DayAvailability]
  }


  type DayAvailability {
    day: String
    start: Float
    end: Float
  }

  input DayAvailabilityInput {
    day: String
    start: Float
    end: Float
  }

  type Auth {
    token: String!
    user: User
  }

  type Query {
    user(username: String!): User
    event(eventId: String!): Event
    # availabilities(eventId: ID!): [UserAvailibilities] ###
    me: User
    availability(eventId: String!): UserAvailabilities
  }


  type Mutation {
    signup(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createEvent(name: String!, location: String, description: String, week: String!, thumbnail: String!): Event
    joinEvent(code: String!): Event
    addAvailability(eventId: String!, availabilities: [DayAvailabilityInput]!): Event
    editAvailability(eventId: String!, availabilities: [DayAvailabilityInput]!): Event
    deleteEvent(eventId: String!): Event
    leaveEvent(eventId: String!): Event
  }
`;

module.exports = typeDefs;
