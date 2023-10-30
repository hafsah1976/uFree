import { gql } from '@apollo/client';

export const CREATE_EVENT = gql`
  mutation CreateEvent($name: String!, $location: String, $description: String, $week: String!, $thumbnail: String!) {
    createEvent(name: $name, location: $location, description: $description, week: $week, thumbnail: $thumbnail) {
      _id
      name
    }
  }
`;

export const ADD_AVAILABILITY = gql`
mutation AddAvailability($eventId: String!, $availabilities: [DayAvailabilityInput]!) {
  addAvailability(eventId: $eventId, availabilities: $availabilities) {
    _id
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

export const SIGN_UP = gql`
  mutation signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        email
        username
      }
    }
  }
`;

export const LOG_IN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
        username
      }
    }
  }
`;
export const LOG_OUT = gql`
  mutation logout($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
        username
      }
    }
  }
`;

export const LEAVE_EVENT = gql`
  mutation leaveEvent($eventId: String!){
    leaveEvent(eventId: $eventId){
      _id
      name
    }
  }
`;

export const EDIT_AVAILABILITY = gql`
  mutation editAvailability($eventId: String!, $availabilities: [DayAvailabilityInput]!) {
    editAvailability(eventId: $eventId, availabilities: $availabilities) {
      _id
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

export const DELETE_EVENT = gql`
mutation DeleteEvent($eventId: String!) {
  deleteEvent(eventId: $eventId) {
    _id
    name
  }
}
`;

export const JOIN_EVENT = gql`
  mutation JoinEvent($code: String!) {
    joinEvent(code: $code) {
      _id
      name
    }
  }
`;