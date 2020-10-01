import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { screen, render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import AddTrip from './AddTrip';

const theme = {
  colors: {
    primary: '#8064f7',
    secondary: '#f5ba9c',
    fill: '#1a1a1a',
    alternateFill: '#f0ebff',
    inactive: '#707386',
  },
};

describe('SearchTrips', () => {
  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <AddTrip
          closeAdd={() => ''}
          showNotification={() => ''}
        />
      </ThemeProvider>,
    );
  });

  test('renders the form', () => {
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  test('renders start location input', () => {
    expect(screen.getByLabelText('From')).toBeInTheDocument();
  });

  test('renders destination input', () => {
    expect(screen.getByLabelText('To')).toBeInTheDocument();
  });

  test('renders date selector', () => {
    expect(screen.getByLabelText('Date')).toBeInTheDocument();
  });

  test('renders seats selector', () => {
    expect(screen.getByLabelText('Seats')).toBeInTheDocument();
  });

  test('renders price selector', () => {
    expect(screen.getByLabelText('Price')).toBeInTheDocument();
  });

  test('renders search button', () => {
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
  });
});
