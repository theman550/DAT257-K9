import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { screen, render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import AddTrip from './AddTrip';
import theme from '../../themes/base';

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

  test('renders date selector', () => {
    expect(screen.getByLabelText('Date/time')).toBeInTheDocument();
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
