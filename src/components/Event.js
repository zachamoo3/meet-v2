// src/components/Event.js

import { useState } from 'react';

const Event = ({ event, id }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <li className="event" id={id ? id : null}>
            <h3>Event Title: {event.summary}</h3>
            <p>Starting Time: {event.start.dateTime}</p>
            <p>Event Location: {event.location}</p>
            <button
                className="details-btn"
                onClick={() => setShowDetails(!showDetails)}
            >
                {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
            {showDetails ? (
                <div className="details">
                    <h4>Event Details:</h4>
                    <p>Description: {event.description}</p>
                </div>
            ) : null}
        </li>
    );
}

export default Event;
