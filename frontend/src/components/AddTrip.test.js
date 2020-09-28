import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  render, screen,
} from '@testing-library/react';
import AddTrip from './AddTrip';

describe('Addtrip', () => {
  beforeEach(() => {
    render(
      <AddTrip />,
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
