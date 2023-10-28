import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const feature = loadFeature('./src/features/showHideEventDetails.feature');

defineFeature(feature, test => {
    test('An event element is collapsed by default.', ({ given, when, then }) => {
        let AppComponent;
        given('the user opens the app', () => {
            AppComponent = render(<App />);
        });

        when('the user receives a list of events', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');

            await waitFor(() => {
                const eventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(eventListItems.length).toBe(32);
            });
        });

        then('all events will be collapsed by default.', () => {
            const AppDOM = AppComponent.container.firstChild;
            const details = AppDOM.querySelector('.details');
            expect(details).not.toBeInTheDocument();
        });
    });

    test('User can expand an event to see details.', ({ given, when, then }) => {
        let AppComponent;
        given('the user gets a list of events', async () => {
            AppComponent = render(<App />);
            const AppDOM = AppComponent.container.firstChild;

            await waitFor(() => {
                const eventList = within(AppDOM).queryAllByRole('listitem');
                expect(eventList[0]).toBeTruthy();
            })
        });

        when('the user selects an event\'s "show details" button', async () => {
            const button = AppComponent.queryAllByText('Show Details')[0];

            await userEvent.click(button);
        });

        then('the details for that event will expand to show.', () => {
            const AppDOM = AppComponent.container.firstChild;
            const details = AppDOM.querySelector('.details');
            expect(details).toBeInTheDocument();
        });
    });

    test('User can collapse an event to hide details.', ({ given, and, when, then }) => {
        let AppComponent;
        let button;
        given('the user user selected an event\'s "show details" button', async () => {
            AppComponent = render(<App />);
            const AppDOM = AppComponent.container.firstChild;

            await waitFor(() => {
                const eventList = within(AppDOM).queryAllByRole('listitem');
                expect(eventList[0]).toBeTruthy();
            });

            button = AppComponent.queryAllByText('Show Details')[0];
            await userEvent.click(button);
        });

        and('the details for that event have expanded', () => {
            const AppDOM = AppComponent.container.firstChild;
            const details = AppDOM.querySelector('.details');
            expect(details).toBeInTheDocument();
        });

        when('the user selects the event\'s "hide details" button', async () => {
            await userEvent.click(button);
        });

        then('the details for that event will collapse to hide.', () => {
            const AppDOM = AppComponent.container.firstChild;
            const details = AppDOM.querySelector('.details');
            expect(details).not.toBeInTheDocument();
        });
    });
});
