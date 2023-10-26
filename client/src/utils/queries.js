import { gql } from '@apollo/client';

export const GET_EVENT = gql`
  query getEvent($eventId: ID!) {
    event(eventId: $eventId) {
      _id 
      name
      admin
      location
      description 
      thumbnail
      week
      attendees {
        _id
        username
      }
      availabilities {
      userId
      availabilities 
   }
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query getSingleUser($username: String!) {
    user(username: $username) {
      _id  
      username
      email
      events {
        _id 
      name
      admin
      location
      description 
      week
      availabilities {
        userId
        availabilities  
     }
      }
    }
   }
`;