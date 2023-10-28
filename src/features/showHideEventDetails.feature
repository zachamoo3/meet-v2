Feature: Show/Hide event details

	Scenario: An event element is collapsed by default.
		Given the user opens the app
		When the user receives a list of events
		Then all events will be collapsed by default.

	Scenario: User can expand an event to see details.
		Given the user gets a list of events
		When the user selects an event's "show details" button
		Then the details for that event will expand to show.

	Scenario: User can collapse an event to hide details.
		Given the user user selected an event's "show details" button
		And the details for that event have expanded
		When the user selects the event's "hide details" button
		Then the details for that event will collapse to hide.
