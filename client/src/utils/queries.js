import { gql } from '@apollo/client';

export const GET_EVENT = gql`
  query getEvent($eventId: String!) {
    event(eventId: $eventId) {
      _id
      name
      location
      description
      thumbnail
      admin {
        _id
        username
      }
      week
      code
      attendees {
        _id
        username
      }
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

export const QUERY_ME = gql`
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

export const QUERY_USER_AVAILABILITY = gql`
query availability($eventId: String!) {
  availability(eventId: $eventId) {
    userId
    availabilities {
      day
      start
      end
    }
  }
}
`;
