import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../themes/base';
import Navigation from './Navigation';

describe('Navigation', () => {
  describe('when user is not logged in', () => {
    beforeEach(() => {
      render(
        <ThemeProvider theme={theme}>
          <Router>
            <Navigation isLoggedIn={false} setIsLoggedIn={() => ''} />
          </Router>
          ,
        </ThemeProvider>,
      );
    });

    it('renders home button', () => {
      expect(screen.getByLabelText('Home')).toBeInTheDocument();
    });

    it('renders login button', () => {
      expect(screen.getByLabelText('Login')).toBeInTheDocument();
    });
  });

  describe('when user is logged in', () => {
    beforeEach(() => {
      render(
        <ThemeProvider theme={theme}>
          <Router>
            <Navigation isLoggedIn={true} setIsLoggedIn={() => ''} />
          </Router>
          ,
        </ThemeProvider>,
      );
    });

    it('renders trips button', () => {
      expect(screen.getByLabelText('Trips')).toBeInTheDocument();
    });

    it('renders account button', () => {
      expect(screen.getByLabelText('Account')).toBeInTheDocument();
    });

    it('renders logout button', () => {
      expect(screen.getByLabelText('Logout')).toBeInTheDocument();
    });
  });
});
