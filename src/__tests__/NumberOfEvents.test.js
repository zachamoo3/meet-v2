//src/__tests__/NumberOfEvents.test.js

import NumberOfEvents from "../components/NumberOfEvents";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe('<NumberOfEvents /> component', () => {
    beforeEach(() => {
        render(
            <NumberOfEvents
                setCurrentNumberOfEvents={() => { }}
                setErrorAlert={() => { }}
            />
        );
    });

    test('contains an element with the role of the textbox', () => {
        expect(screen.getByRole('textbox'))
            .toBeInTheDocument();
    });

    test('input field contains a default value of 32', () => {
        expect(screen.getByDisplayValue('32'))
            .toBeInTheDocument();
    });

    test('textbox changes value when user types in it', async () => {
        const user = userEvent.setup();
        await user.type(screen.getByRole('textbox'), '{backspace}{backspace}10');
        //user deletes the 32 then types 10 into the input
        expect(screen.getByDisplayValue('10'))
            .toBeInTheDocument();
    });
});
