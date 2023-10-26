import { gql } from '@apollo/client';

export const AUTH_MUTATION = gql`
  mutation AuthenticateUser($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
      token
    }
  }
`;

export const CREATE_EVENT = gql`
  mutation CreateEvent($name: String!) {
    createEvent(name: $name) {
      name
      _id
    }
  }
  `


// update availibility mutation once get model
//not sure if i make $time a integer to make it easier to compare 
export const ADD_AVAILABILITY = gql`
  mutation addAvailablity($day: Date!, $start: int!, $end: int!) {
    addEvent(day: $day, start: $start, end:$end) {
      _id
      day
      start
      end
     
    }
  }
`;
export const SIGN_UP= gql`
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
export const LOG_IN= gql`
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

