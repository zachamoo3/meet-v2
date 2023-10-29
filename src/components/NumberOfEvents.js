// src/components/NumberOfEvents.js

const NumberOfEvents = ({ setCurrentNumberOfEvents, setErrorAlert }) => {

    const handleInputChanged = (event) => {
        const value = event.target.value;

        let errorText;
        if (isNaN(value) || value <= 0) {
            errorText = 'Please enter a number greater than 0.';
            setErrorAlert(errorText);
        } else {
            errorText = '';
            setErrorAlert(errorText);
            setCurrentNumberOfEvents(value);
        }
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
