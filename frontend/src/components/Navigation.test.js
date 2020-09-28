import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './Navigation';

describe('Navigation', () => {
  beforeEach(() => {
    render(
      <Router>
        <Navigation />
      </Router>,
    );
  });

  it('renders account button', () => {
    expect(screen.getByTitle('Account')).toBeInTheDocument();
  });

  it('renders trips button', () => {
    expect(screen.getByTitle('Trips')).toBeInTheDocument();
  });
});
