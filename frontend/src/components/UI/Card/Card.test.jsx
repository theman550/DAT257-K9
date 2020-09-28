import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Card from './Card';

const theme = {
  colors: {
    primary: '#8064f7',
    secondary: '#f5ba9c',
    fill: '#1a1a1a',
    alternateFill: '#f0ebff',
    inactive: '#707386',
  },
};

describe('Card', () => {
  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <Card
          headerContent={<p>this is header content</p>}
          bodyContent={<h2>some body once told me</h2>}
        />
      </ThemeProvider>,
    );
  });

  describe('renders header and body content in card', () => {
    it('renders header content', () => {
      expect(screen.getByText('this is header content')).toBeInTheDocument();
    });

    it('renders body content', () => {
      expect(screen.getByText('some body once told me')).toBeInTheDocument();
    });
  });
});
