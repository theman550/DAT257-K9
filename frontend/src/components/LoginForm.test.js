import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  beforeEach(() => {
    render(
      <LoginForm />,
    );
  });

  it('test sin in email address', () => {
    expect(screen.queryAllByTestId('email')).toBeTruthy();
  });

  it('test sin in password', () => {
    expect(screen.queryAllByTestId('password')).toBeTruthy();
  });
});
