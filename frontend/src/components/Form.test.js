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

  it('renders FirstName', () => {
    expect(screen.getByText('FirstName')).toBeInTheDocument();
  });

  it('renders LastName', () => {
    expect(screen.getByText('LastName')).toBeInTheDocument();
  });

  it('renders Email', () => {
    expect(screen.getByText('Email')).toBeInTheDocument();
  });
  it('renders USerName', () => {
    expect(screen.getByText('USerName')).toBeInTheDocument();
  });

  it('renders Password', () => {
    expect(screen.getByText('USerName')).toBeInTheDocument();
  });

  it('renders ConfirmPassword', () => {
    expect(screen.getByText('ConfirmPassword')).toBeInTheDocument();
  });

  it('submit button', () => {
    expect(screen.queryAllByTestId('Submit')).toBeTruthy();
  });
});
