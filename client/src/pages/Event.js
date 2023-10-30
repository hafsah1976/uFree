import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { GET_EVENT, QUERY_ME } from '../utils/queries';
import { DELETE_EVENT, LEAVE_EVENT } from '../utils/mutations';
// import Auth from '../utils/auth';
import EventHeader from '../components/EventHeader';
import EventDaySelector from '../components/EventDaySelector';

const Event = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(GET_EVENT, {
    variables: { eventId },
  });
  const event = data?.event;

  const { data: userData } = useQuery(QUERY_ME);

  const user = userData?.me;

  const [deleteEvent] = useMutation(DELETE_EVENT);
  const [leaveEvent] = useMutation(LEAVE_EVENT);

  const handleDeleteEvent = async () => {
    // const token = Auth.loggedIn() ? Auth.getToken() : null;
    // if (!token) {
    //   // User is not logged in, handle this scenario as needed
    //   return;
    // }

    // if (!user) {
    //   // No user data available, handle this scenario as needed
    //   return;
    // }

    // // Check if the logged-in user is the admin of the event
    // if (user.email !== data.event.admin.email) {
    //   // Display a message or take appropriate action (e.g., return or show an error message)
    //   console.log("You do not have permission to delete this event");
    //   return;
    // }

    try {
      await deleteEvent({
        variables: { eventId },
      });

      // After successful deletion, navigate to a different page (e.g., event list)
      // navigate('/dashboard');
      window.location.assign('/dashboard');
      
    } catch (err) {
      console.error(err);
    }
  };
  
  const handleLeaveEvent = async () => {
    try {
      await leaveEvent({
        variables: { eventId },
      });
      
      window.location.assign('/dashboard');
      // navigate('/dashboard');
      // window.location.reload();
    }
    catch(err) {
      console.error(err);
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading data</p>;
  }

  const isAdmin = user?._id === event?.admin._id;

  return (
    <>
      {loading
        ? (
          <p>Loading...</p>
        ) : (
          <section id="content_event_page">
            <EventHeader event={event} />
            <EventDaySelector avails={event.availabilities} attendees={event.attendees} />

            <div>
                {isAdmin 
                  ? (
                    <button className="drop_event_btn btn btn_accent" onClick={handleDeleteEvent}>Delete Event</button>
                  ) : (
                    <button className="drop_event_btn btn btn_accent" onClick={handleLeaveEvent}>Leave Event</button>
                )}
            </div>
          </section>
      )}
    </>
  );
};

export default Event;
