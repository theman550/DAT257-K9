import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  render, screen,
} from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Form from './Form';

describe('Form', () => {
  beforeEach(() => {
    render(
      // eslint-disable-next-line react/jsx-filename-extension
      <Router>
        <Form />
      </Router>,
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
    expect(screen.getByAltText('submit')).toBeTruthy();
  });
});