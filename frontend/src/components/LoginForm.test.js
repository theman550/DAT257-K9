import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import LoginForm from './LoginForm';
import theme from '../themes/base';

describe('Login form', () => {
  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <Router>
          <LoginForm showNotification={() => ''} />
        </Router>
      </ThemeProvider>,
    );
  });

  it('test email address', () => {
    expect(screen.queryAllByTestId('email')).toBeTruthy();
  });

  it('test  password', () => {
    expect(screen.queryAllByTestId('password')).toBeTruthy();
  });
});
