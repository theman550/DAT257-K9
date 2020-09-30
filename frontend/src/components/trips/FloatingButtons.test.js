import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { screen, render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import FloatingButtons from './FloatingButtons';
import theme from '../../themes/base';

const openSearch = jest.fn();
const openAdd = jest.fn();

describe('FloatingButtons', () => {
  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <FloatingButtons
          openSearch={() => openSearch()}
          openAdd={() => openAdd()}
        />
      </ThemeProvider>,
    );
  });

  test('calls openSearch on click', () => {
    const searchButton = screen.getAllByRole('button')[0];

    fireEvent.click(searchButton);
    expect(openSearch).toHaveBeenCalled();
  });

  test('calls openAdd on click', () => {
    const addButton = screen.getAllByRole('button')[1];

    fireEvent.click(addButton);
    expect(openAdd).toHaveBeenCalled();
  });
});
