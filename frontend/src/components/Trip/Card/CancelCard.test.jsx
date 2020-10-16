import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import CancelCard from './CancelCard';
import theme from '../../../themes/base';

describe('Cancel card', () => {
  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <CancelCard
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

  it('displays a cancel button', () => {
    expect(screen.getByText('Cancel booking')).toBeInTheDocument();
  });
});
