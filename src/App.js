// src/App.js

import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { useState, useEffect } from 'react';
import { getEvents, extractLocations } from './api';
import './App.css';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';

const App = () => {
	const [events, setEvents] = useState([]);
	const [currentNumberOfEvents, setCurrentNumberOfEvents] = useState(32);
	const [allLocations, setAllLocations] = useState([]);
	const [currentCity, setCurrentCity] = useState("See all cities");
	const [infoAlert, setInfoAlert] = useState('');
	const [errorAlert, setErrorAlert] = useState('');
	const [warningAlert, setWarningAlert] = useState('');

	useEffect(() => {
		if (navigator.onLine) {
			setWarningAlert('');
		} else {
			setWarningAlert('Warning. You are offline. Displayed lists may be out of date. Reconnect to ensure the events are up to date.')
		}
		fetchData();
	}, [
		currentCity,
		currentNumberOfEvents
	]);

	const fetchData = async () => {
		const allEvents = await getEvents();
		const filteredEvents = currentCity === "See all cities" ?
			allEvents :
			allEvents.filter(event => event.location === currentCity)
		setEvents(filteredEvents.slice(0, currentNumberOfEvents));
		setAllLocations(extractLocations(allEvents));
	}

	return (
		<div className="App">
			<div className='alerts-container'>
				{infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
				{errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
				{warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
			</div>
			<CitySearch
				allLocations={allLocations}
				setCurrentCity={setCurrentCity}
				setInfoAlert={setInfoAlert}
			/>
			<NumberOfEvents
				setCurrentNumberOfEvents={setCurrentNumberOfEvents}
				setErrorAlert={setErrorAlert}
			/>
			<EventList
				events={events}
			/>
		</div>
	);
}

export default App;
