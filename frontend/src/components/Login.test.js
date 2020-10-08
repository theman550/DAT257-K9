import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Login from './Login';


const theme = {
  colors: {
    primary: '#8064f7',
    secondary: '#f5ba9c',
    fill: '#1a1a1a',
    alternateFill: '#f0ebff',
    inactive: '#707386',
  },
  padding: {
    section: '1rem 1rem',
  },
  size: {
    navbar: '60px',
    corner: '0.5rem',
    button: '0.75rem',
  },
  spacing: {
    subsection: '1rem',
    section: '2rem',
  },

};



describe('Login', () => {
  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <Login
          showNotification={() => ''}
        />
      </ThemeProvider>,
    );
  });

  it('test sin in email address', () => {
    expect(screen.queryAllByTestId('email')).toBeTruthy();
  });

  it('test sin in password', () => {
    expect(screen.queryAllByTestId('password')).toBeTruthy();
  });
});
