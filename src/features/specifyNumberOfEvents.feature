Feature: Specify number of events

    Scenario: When user has not specified a number, 32 events are shown by default.
        Given the user has not specified or filtered the number of events
        When the user sees the list of events
        Then the default number of displayed events will be 32.

    Scenario: User can change the number of events displayed.
        Given the user has the list of events displayed
        When the user inputs a number of events to be displayed
        Then the number of events displayed will update to the inputed number.
