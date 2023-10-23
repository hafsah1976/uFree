import { gql } from '@apollo/client';

export const ADD_EVENT = gql`
  mutation addEvent($name: String!, $week: Date!, $location: String!, $description: String!, $image:link?) {
    addEvent(name: $name, week: $week, location:$location, description: $description, image: $image) {
      _id
      name
      week
      location
      decription
      image
     
    }
  }
`;

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
