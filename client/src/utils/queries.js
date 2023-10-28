import { gql } from '@apollo/client';

export const GET_EVENT = gql`
  query getEvent($eventId: String!) {
    event(eventId: $eventId) {
      _id
      name
      location
      description
      thumbnail
      week
      code
      availabilities {
        userId
        availabilities {
          day
          start
          end
        }
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

export const ME = gql`
  query Me {
    me {
      _id
      email
      username
      events {
        _id
        name
        thumbnail
        week
        location
      }
    }
  }
`;



   
    
  

 //,  dont need availabilities because we are getting it when returning single user, me