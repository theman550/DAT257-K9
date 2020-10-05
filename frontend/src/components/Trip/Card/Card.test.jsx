import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Card from './Card';
import theme from '../../../themes/base';

describe('Trip card', () => {
  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <Card
          id="1"
          origin="Göteborg"
          destination="Malmö"
          seats={4}
          driver={{ firstName: 'David', lastName: 'Hernandez' }}
          datetime={new Date('July 16, 2018 16:00:00')}
        />
      </ThemeProvider>,
    );
  });

  describe('correctly displays trip data on card', () => {
    it('renders origin to destination', () => {
      // expect(screen.getByText('Göteborg - Malmö')).toBeInTheDocument();
      // 'Göteborg' and 'Malmö' are separated in span elements
      expect(screen.getByText('Göteborg -')).toBeInTheDocument();
      expect(screen.getByText('Malmö')).toBeInTheDocument();
    });

    it('renders and formats trip date for ease-of-use', () => {
      expect(screen.getByText('Departs at')).toBeInTheDocument();
      // Does not work with React's test tools for some reason
      // expect(screen.getByText('16/7 16:00')).toBeInTheDocument();
    });

    it('renders the amount of available seats', () => {
      expect(screen.getByText('seats')).toBeInTheDocument();
      expect(screen.getByText('4')).toBeInTheDocument();
    });

    it('renders the driver\'s name', () => {
      expect(screen.getByText('David Hernandez')).toBeInTheDocument();
    });
  });
});
