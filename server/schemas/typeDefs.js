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
    Events: [Event]
    Event(eventId: ID!): Event
  }


  type Mutation {
    addEvent(name: String!, week: Date!, location: String!, description: String!, image: link): Thought
    addavailibility(thoughtId: ID!, commentText: String!): Thought
    removeEvent(eventId: ID!): Event
    
  }
`;

module.exports = typeDefs;
