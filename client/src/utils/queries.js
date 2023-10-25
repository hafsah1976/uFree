
export const QUERY_SINGLE_EVENT = gql`
  query getSingleEvent($eventId: ID!) {
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
  query getSingleUser($userId: ID!) {
    user(userId: $userId) {
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



   
    
  

 //,  dont need availabilities because we are getting it when returning single user, me