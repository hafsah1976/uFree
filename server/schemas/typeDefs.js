const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Event {
    _id: ID
    name: String
    week: Date
    location: String
    description: String
    image: link?
  }

  type User {
    _id: ID
    username: String
    email: string
    Password: String ? do i include sensitive data in the typedef
    events:[Event]
    availibility: availibility
  }

  type availibility {
   user: [User]
    availibility: 
   }
    //trying to have it so availibility query brings up all users availibility
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
