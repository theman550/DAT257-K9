import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('renders logo', () => {
    expect(screen.getByText('Share-a-ride')).toBeInTheDocument();
  });

  it('renders home by default', () => {
    expect(screen.getByText('Home page')).toBeInTheDocument();
  });

  it('renders search page when clicking search link in navbar', () => {
    fireEvent.click(screen.getByText('Search'));
    expect(screen.getByRole('button', {name: 'Search'})).toBeInTheDocument();
  });

  it('renders add page when clicking add trip link in navbar', () => {
    fireEvent.click(screen.getByText('Add trip'));
    expect(screen.getByText('Add trip page')).toBeInTheDocument();
  });
});
