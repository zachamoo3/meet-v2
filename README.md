# myflix-client-v2
 
Project description.
    A serverless progressive web application that allows users to view events being held within cities. 

Objective of the project.
    To build a serverless, progressive web application (PWA) with React using a test-driven development (TDD) technique.  The application uses the Google Calendar API to fetch upcoming events.

Links to project.
    Live Deployment:
        https://zachamoo3.github.io/meet-v2/
    GitHub Repository:
        https://github.com/zachamoo3/meet-v2

Project dependencies.
    Technologies Used:
        Create React App.
    Package Dependencies:
        Bootstrap,
        Prop-Types,
        React,
        React-Bootstrap,
        React-Dom,
        React-Modal,
        React-Router,
        React-Router-DOM,
        Redux.
    Developer Dependencies Used:
        @parcel/transformer-sass,
        Parcel,
        Process.

Other notes.
    

Key Features.
    1. Filter Events by City.
    2. Show/Hide Event Details.
    3. Specify Number of Events.
    4. Use the App When Offline.
    5. Add an App Shortcut to the Home Screen.
    6. Display Charts Visualizing Event Details.


User Stories.
    1. As a user, I would like to be able to filter events by city so that I can see the list of events that take place in that city.

    2. As a user, I would like to be able to show/hide event details so that I can see more/less information about an event.

    3. As a user, I would like to be able to specify the number of events I want to view in the app so that I can see more or fewer events in the events list at once.

    4. As a user, I would like to be able to use the app when offline so that I can see the events I viewed the last time I was online.

    5. As a user, I would like to be able to add the app shortcut to my home screen so that I can open the app faster.

    6. As a user, I would like to be able to see a chart showing the upcoming events in each city so that I know what events are organized in which city.


Gherkin Scenarios.
    1. Filter Events by City.
        Given the user has launched the "Meet" application and is on the events listing page,
        when the user selects a specific city from the available options in the filter menu,
        then the events listing page refreshes, displaying only the events that are located in the selected city.

    2. Show/Hide Event Details.
        Given the user is viewing the event details page,
        when the user clicks a toggle button,
        then the event details section either expands or collapses, showing or hiding additional information about the specific event.

    3. Specify Number of Events.
        Given the user is on the event listing page,
        when the user selects a number option from a drop-down menu,
        then the events listing page refreshes, displaying the specified number of events.

    4. Use the App When Offline.
        Given the user has previously accessed the event application and has an active internet connection,
        when the user loses internet connectivity or enables airplane mode,
        then the event application displays a message indicating that the user is offline and some features may be limited or unavailable but recently viewed events and cached data are still accessible.

    5. Add an App Shortcut to the Home Screen.
        Given the user has launched the "Meet" application and is online,
        when the user clicks a "Add to Home" button near or within the settings,
        then the user is given a prompt to add a shortcut to their home screen.

    6. Display Charts Visualizing Event Details.
        Given the user is viewing the event details page,
        when the user clicks a "View Charts" button within the event details page,
        then the application retrieves relevant data and generates visually appealing charts, presenting them to the user within the event details page to provide additional insights or statistics about the event.

How this project will utilize serverless functions:
    The Meet App will use serverless functions to authenticate the user's device with their Google account.  Then, the authenticated user can access, use, and view the Meet App until their authentication expires.

Troubleshooting "gh-pages" Deployments
    Sometimes, running `npm run deploy` doesn't affect your repository, despite it providing a success message when the command has been completed.
    If this occurs, delete your "gh-pages" branch from your repository.  You can run the following command to delete the branch in the terminal.  Make sure that you're inside the following project folder: `git push origin --delete gh-pages`.
    Then, rerun `npm run deploy`.  You don't need to recreate the branch before running this, as this command will automatically create the branch if it doesn't exist (which it doesn't, as you just deleted it). This should successfully deploy your app.
    You don't need to worry about losing the commit history for "gh-pages", because you'll find that once you run the deploy command again, the "gh-pages" commits from the previous version of the branch are restored.
    