import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { GET_EVENT, ME } from '../utils/queries';
import { DELETE_EVENT } from '../utils/mutations';
import Auth from '../utils/auth';
import EventHeader from '../components/EventHeader';
import EventDaySelector from '../components/EventDaySelector';

const Event = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(GET_EVENT, {
    variables: { eventId },
  });

  const { data: userData } = useQuery(ME);

  const user = userData?.me;

  const [deleteEvent] = useMutation(DELETE_EVENT);

  const handleDeleteEvent = async (eventId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      // User is not logged in, handle this scenario as needed
      return;
    }

    if (!user) {
      // No user data available, handle this scenario as needed
      return;
    }

    // Check if the logged-in user is the admin of the event
    if (user.email !== data.event.admin.email) {
      // Display a message or take appropriate action (e.g., return or show an error message)
      console.log("You do not have permission to delete this event");
      return;
    }

    try {
      await deleteEvent({
        variables: { eventId: eventId },
      });

      // After successful deletion, navigate to a different page (e.g., event list)
      navigate('/events');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading data</p>;
  }

  const event = data?.event;
  return (
    <>
    {loading ? (
      <p>Loading...</p>
    ) : (
      <section id="content_event_page">
        <EventHeader event={data.event} />
        <EventDaySelector avails={data.event.availabilities} attendees={data.event.attendees} />

    <div>
        <h2>{event.name}</h2>
        <p>{event.description}</p>
        {user && user.email === event.admin.email && (
        <button onClick={() => handleDeleteEvent(event._id)}>
        Delete Event
      </button>
      )}
      </div>

        </section>
      )}
    </>
  );
};

export default Event;
