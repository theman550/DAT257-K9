import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Card from './Card';
import theme from '../../../themes/base';

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
