// src/__tests__/Event.test.js

import { render, screen } from '@testing-library/react';
import Event from '../components/Event';
import mockData from '../mock-data';
import userEvent from '@testing-library/user-event';

const mockEvent = mockData[0];

describe('<Event /> component', () => {
    beforeEach(() => {
        render(<Event event={mockEvent} />);
    })

    test('renders event title', () => {
        expect(screen.getByText('Event Title: ' + mockEvent.summary))
            .toBeInTheDocument();
    });

    test('renders event start time', () => {
        expect(screen.getByText('Starting Time: ' + mockEvent.start.dateTime))
            .toBeInTheDocument();
    });

    test('renders event location', () => {
        expect(screen.getByText('Event Location: ' + mockEvent.location))
            .toBeInTheDocument();
    });

    test('renders event details button', () => {
        expect(screen.getByRole('button'))
            .toBeInTheDocument();
    });

    test('details section is hidden by default', () => {
        expect(screen.queryByText('Event Details:'))
            .not.toBeInTheDocument();
    });

    test('show details when the user clicks "show details" button', async () => {
        const user = userEvent.setup();
        await user.click(screen.queryByText('Show Details'));
        // user click has been simulated, now the Event Details should be present
        expect(screen.getByText('Event Details:'))
            .toBeInTheDocument();
    });

    test('hide details when the user clicks "hide details" button', async () => {
        const user = userEvent.setup();
        await user.click(screen.queryByText('Show Details'));
        //user click has been simulated, now the Event Details should be present
        await user.click(screen.queryByText('Hide Details'));
        //user click has been simulated, now the Event Details should be hidden
        expect(screen.queryByText('Event Details:'))
            .not.toBeInTheDocument();
    });
});
