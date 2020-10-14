import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import BookCard from './BookCard';
import theme from '../../../themes/base';

describe('Book card', () => {
  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <BookCard
          trip={
            ({
              tripID: '0',
              userID: '10',
              startLocation: 'Göteborg',
              destination: 'Malmö',
              driver: {
                firstName: 'David',
                lastName: 'Hernandez',
              },
              startTime: new Date('July 16, 2018 16:00:00'),
              seatsAvailable: '4',
            })
          }
        />
      </ThemeProvider>,
    );
  });

  describe('displays a seats field that', () => {
    it('shows how many seats to book', () => {
      expect(screen.getByLabelText('seats')).toBeInTheDocument();
    });

    it('increases seats if clicked', () => {
      const numberInput = screen.getByLabelText('seats');
      fireEvent.change(numberInput, { target: { value: '2' } });
      expect(numberInput.value).toBe('2');
    });
  });

  describe('displays a book button', () => {
    it('shows "Book 1 seat" if 1 seat is selected', () => {
      expect(screen.getByText('Book 1 seat')).toBeInTheDocument();
    });

    it('shows "Book 2 seats" if 2 seats are selected', () => {
      const numberInput = screen.getByLabelText('seats');
      fireEvent.change(numberInput, { target: { value: '2' } });
      expect(screen.getByText('Book 2 seats')).toBeInTheDocument();
    });
  });
});
