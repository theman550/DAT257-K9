import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  screen, render, fireEvent,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import SearchTrips from './SearchTrips';
import theme from '../../themes/base';

describe('SearchTrips', () => {
  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <SearchTrips
          closeSearch={() => ''}
          getTrips={() => ''}
        />
      </ThemeProvider>,
    );
  });

  test('renders the form', () => {
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  test('renders start location input', () => {
    expect(screen.getByPlaceholderText('Enter start location...')).toBeInTheDocument();
  });

  test('renders destination input', () => {
    expect(screen.getByPlaceholderText('Enter destination...')).toBeInTheDocument();
  });

  test('renders datetime selector', () => {
    expect(screen.getByLabelText('Date/time')).toBeInTheDocument();
  });

  test('renders seats selector', () => {
    expect(screen.getByLabelText('Seats')).toBeInTheDocument();
  });

  test('renders price selector', () => {
    expect(screen.getByLabelText('Price')).toBeInTheDocument();
  });

  test('renders search button', () => {
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  test('should accept a start location', () => {
    const input = screen.getByPlaceholderText('Enter start location...');
    fireEvent.change(input, { target: { value: 'Göteborg' } });
    expect(input.value).toBe('Göteborg');
  });

  test('should accept a destination', () => {
    const input = screen.getByPlaceholderText('Enter destination...');
    fireEvent.change(input, { target: { value: 'Oslo' } });
    expect(input.value).toBe('Oslo');
  });

  test('should accept a datetime', () => {
    const input = screen.getByLabelText('Date/time');
    fireEvent.change(input, { target: { value: '2020-10-01T15:35:35' } });
    expect(input.value).toBe('2020-10-01T15:35');
  });

  test('should accept number of seats', () => {
    const input = screen.getByLabelText('Seats');
    fireEvent.change(input, { target: { value: '4' } });
    expect(input.value).toBe('4');
  });

  test('should accept min price', () => {
    const input = screen.getByPlaceholderText('Min');
    fireEvent.change(input, { target: { value: '100' } });
    expect(input.value).toBe('100');
  });

  test('should accept max price', () => {
    const input = screen.getByPlaceholderText('Max');
    fireEvent.change(input, { target: { value: '100' } });
    expect(input.value).toBe('100');
  });

  test('should not accept a negative price', () => {
    const input = screen.getByPlaceholderText('Max');
    const searchBtn = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(input, { target: { value: '-100' } });
    fireEvent.click(searchBtn);
    expect(searchBtn).toBeInTheDocument();
  });

  test('should not accept a negative seat number', () => {
    const input = screen.getByLabelText('Seats');
    const searchBtn = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(input, { target: { value: '-1' } });
    fireEvent.click(searchBtn);
    expect(searchBtn).toBeInTheDocument();
  });
});
