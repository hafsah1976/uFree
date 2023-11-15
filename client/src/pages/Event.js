import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { GET_EVENT } from '../utils/queries';
import { DELETE_EVENT, LEAVE_EVENT } from '../utils/mutations';
import { useAuth } from '../utils/AuthContext';
import EventHeader from '../components/EventHeader';
import EventDaySelector from '../components/EventDaySelector';

const Event = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(GET_EVENT, {
    variables: { eventId },
  });
  const event = data?.event;

  const { user } = useAuth();

  const [deleteEvent] = useMutation(DELETE_EVENT);
  const [leaveEvent] = useMutation(LEAVE_EVENT);

  const handleDeleteEvent = async () => {
    try {
      await deleteEvent({
        variables: { eventId },
      });

      // After successful deletion, navigate to a different page (e.g., event list)
      navigate('/dashboard');
      // window.location.assign('/dashboard');
      
    } catch (err) {
      console.error(err);
    }
  };
  
  const handleLeaveEvent = async () => {
    try {
      await leaveEvent({
        variables: { eventId },
      });
      
      // window.location.assign('/dashboard');
      navigate('/dashboard');
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
            <EventDaySelector event={event} user={user} avails={event.availabilities} attendees={event.attendees} />

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
