import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  render, screen,
} from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../themes/base';
import Form from './Form';

describe('Form', () => {
  beforeEach(() => {
    render(
      // eslint-disable-next-line react/jsx-filename-extension
      <ThemeProvider theme={theme}>
        <Router>
          <Form />
        </Router>
        ,
      </ThemeProvider>
      ,
    );
  });

  it('renders firstName', () => {
    expect(screen.getByAltText('firstName')).toBeInTheDocument();
  });

  it('renders lastName', () => {
    expect(screen.getByAltText('lastName')).toBeInTheDocument();
  });

  it('renders email', () => {
    expect(screen.getByAltText('email')).toBeInTheDocument();
  });
  it('renders userName', () => {
    expect(screen.getByAltText('userName')).toBeInTheDocument();
  });

  it('renders password', () => {
    expect(screen.getByAltText('password')).toBeInTheDocument();
  });

  it('renders confirmPassword', () => {
    expect(screen.getByAltText('confirmPassword')).toBeInTheDocument();
  });

  it('submit button', () => {
    expect(screen.getByTestId('submit')).toBeInTheDocument();
  });
});
