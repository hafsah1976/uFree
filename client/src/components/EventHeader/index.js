import './EventHeader.css';

export default function EventHeader({ event }) {
    return (
        <div className='event_header_container' style={{
            backgroundImage: `url("${event.thumbnail}")`,
        }}>

        </div>
    )
}