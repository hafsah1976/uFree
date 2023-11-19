import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useParams, useNavigate, useLoaderData } from 'react-router-dom';
import { DELETE_EVENT, LEAVE_EVENT } from '../utils/mutations';
import { useAuth } from '../utils/AuthContext';
import EventHeader from '../components/EventHeader';
import EventDaySelector from '../components/EventDaySelector';
import Modal from '../components/Modal';

const Event = () => {
  const { eventId } = useParams();
  const event = useLoaderData();

  const navigate = useNavigate();

  const { user } = useAuth();

  const [deleteEvent] = useMutation(DELETE_EVENT);
  const [leaveEvent] = useMutation(LEAVE_EVENT);

  const handleDeleteEvent = async () => {
    try {
      await deleteEvent({
        variables: { eventId },
      });

      setDeleteEventModal(false);

      // After successful deletion, navigate to a different page (e.g., event list)
      navigate('/dashboard');
    } 
    catch (err) {
      console.error(err);
    }
  };
  
  const handleLeaveEvent = async () => {
    try {
      await leaveEvent({
        variables: { eventId },
      });
      
      setLeaveEventModal(false);
      navigate('/dashboard');
    }
    catch(err) {
      console.error(err);
    }
  }

  const isAdmin = user?._id === event?.admin._id;

  const [deleteEventModal, setDeleteEventModal] = useState(false);
  const [leaveEventModal, setLeaveEventModal] = useState(false);

  return (
    <>
      <section id="content_event_page">
        <EventHeader event={event} />
        <EventDaySelector event={event} user={user} avails={event.availabilities} attendees={event.attendees} />

        <div>
            {isAdmin 
              ? <button className="drop_event_btn btn btn_accent" onClick={() => setDeleteEventModal(true)}>Delete Event</button>
              : <button className="drop_event_btn btn btn_accent" onClick={() => setLeaveEventModal(true)}>Leave Event</button>
            }
        </div>
      </section>
    
      {/* Delete event modal */}
      <Modal
          isOpen={deleteEventModal}
          onRequestClose={() => setDeleteEventModal(false)}
          modalBody={
            <>
              <p>Are you sure you want to delete this event?</p>
              <p>All attendees will be removed.</p>
            </>
          }
          modalFooter={
            <div className='justify-content-end flex-wrap gap-sm'>
              <p className='modal_close modal_close_danger' onClick={handleDeleteEvent}>Delete</p>
              <p className='modal_close' onClick={() => setDeleteEventModal(false)}>Cancel</p>
            </div>
          }
      />

      {/* Leave event modal */}
      <Modal
          isOpen={leaveEventModal}
          onRequestClose={() => setLeaveEventModal(false)}
          modalBody={
            <>
              <p>Are you sure you want to leave this event?</p>
            </>
          }
          modalFooter={
            <div className='justify-content-end flex-wrap gap-sm'>
              <p className='modal_close modal_close_danger' onClick={handleLeaveEvent}>Leave</p>
              <p className='modal_close' onClick={() => setLeaveEventModal(false)}>Cancel</p>
            </div>
          }
      />
    </>

  );
};

export default Event;
