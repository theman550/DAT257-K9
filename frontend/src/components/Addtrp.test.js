import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
    render, screen,
} from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Addtrip from './Addtrip';

describe('Addtrip', () => {
    beforeEach(() => {
        render(
            <Router>
                <Addtrip />
            </Router>,
        );
    });

    it('renders Date', () => {
        expect(screen.getByText('Date')).toBeInTheDocument();
    });

    it('renders Seats', () => {
        expect(screen.getByText('Seats')).toBeInTheDocument();
    });

    it('renders Time', () => {
        expect(screen.getByText('Time')).toBeInTheDocument();
    });

    it('submit button', () => {
        expect(screen.queryAllByTestId('add-button')).toBeTruthy();
    });
});
