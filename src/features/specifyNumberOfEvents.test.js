import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    test('When user has not specified a number, 32 events are shown by default.', ({ given, when, then }) => {
        let AppComponent;
        given('the user has not specified or filtered the number of events', () => {
            AppComponent = render(<App />);
        });

        let eventList;
        when('the user sees the list of events', async () => {
            const AppDOM = AppComponent.container.firstChild;
            await waitFor(() => {
                eventList = within(AppDOM).queryAllByRole('listitem');
                expect(eventList[0]).toBeTruthy();
            });
        });

        then('the default number of displayed events will be 32.', () => {
            expect(eventList.length).toEqual(32);
        });
    });

    test('User can change the number of events displayed.', ({ given, when, then }) => {
        let AppComponent;
        given('the user has the list of events displayed', async () => {
            AppComponent = render(<App />);
            const AppDOM = AppComponent.container.firstChild;
            await waitFor(() => {
                const eventList = within(AppDOM).queryAllByRole('listitem');
                expect(eventList[0]).toBeTruthy();
            })
        });

        when('the user inputs a number of events to be displayed', async () => {
            const button = AppComponent.queryByTestId('numberOfEventsInput');

            await userEvent.type(button, '{backspace}{backspace}10');
        });

        then('the number of events displayed will update to the inputed number.', () => {
            const AppDOM = AppComponent.container.firstChild;
            const eventList = within(AppDOM).queryAllByRole('listitem');
            expect(eventList.length).toEqual(10);
        });
    });
});