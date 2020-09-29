import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../themes/base';
import Navigation from './Navigation';

describe('Navigation', () => {
  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <Router>
          <Navigation />
        </Router>
        ,
      </ThemeProvider>,
    );
  });

  it('renders account button', () => {
    expect(screen.getByLabelText('Account')).toBeInTheDocument();
  });

  it('renders trips button', () => {
    expect(screen.getByLabelText('Trips')).toBeInTheDocument();
  });
});
