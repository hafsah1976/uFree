import { gql } from '@apollo/client';

export const login = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
      }
    }
  }
`;

export const SIGNUP = gql`
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

export const CreateEvent = gql`
  mutation createEvent($name: String!) {
    createEvent(name: $name) {
      name
      _id
    }
  }
`;

// update availibility mutation once get model
//not sure if i make $time a integer to make it easier to compare 
export const ADD_AVAILABILITY = gql`
  mutation addAvailability($day: Date!, $start: Int!, $end: Int!) {
    addAvailability(day: $day, start: $start, end: $end) {
      _id
      day
      start
      end
    }
  }
`;