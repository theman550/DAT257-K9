import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('renders navbar with home button', () => {
    expect(screen.getByLabelText('Home')).toBeInTheDocument();
  });

  it('renders navbar with account button', () => {
    expect(screen.getByLabelText('Account')).toBeInTheDocument();
  });

  it('renders navbar with trips button', () => {
    expect(screen.getByLabelText('Trips')).toBeInTheDocument();
  });

  it('renders trips page when clicking trips button in navbar', () => {
    fireEvent.click(screen.getByLabelText('Trips'));
    expect(screen.getByLabelText('Search')).toBeInTheDocument();
  });

  it('renders account page when clicking accout button in navbar', () => {
    fireEvent.click(screen.getByLabelText('Account'));
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });
});
