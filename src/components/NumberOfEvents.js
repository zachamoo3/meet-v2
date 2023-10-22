// src/components/NumberOfEvents.js

const NumberOfEvents = ({ setCurrentNumberOfEvents }) => {
    const handleInputChanged = (event) => {
        const value = event.target.value;
        setCurrentNumberOfEvents(value);
    }

    return (
        <div id="number-of-events">
            <input
                type="text"
                className="event-number"
                defaultValue="32"
                onChange={handleInputChanged}
                data-testid="numberOfEventsInput"
            />
        </div>
    )
}

export default NumberOfEvents;
