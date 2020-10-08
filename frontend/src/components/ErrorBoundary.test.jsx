import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../themes/base';
import ErrorBoundary from './ErrorBoundary';
import { mount } from '../enzyme';

const DummyComponent = () => null;

describe('Error boundary', () => {
  let wrapper;
  let error;

  beforeEach(() => {
    wrapper = mount(
      <ThemeProvider theme={theme}>
        <Router>
          <ErrorBoundary sectionName="Trip Page">
            <DummyComponent />
          </ErrorBoundary>
        </Router>
        ,
      </ThemeProvider>,
    );

    error = new Error('Error boundary test');
  });

  it('does nothing if child components does not throw', () => {
    expect(wrapper.text()).not.toContain('Something went wrong.');
  });

  it('displays a message indicating something went wrong if a component throws', () => {
    wrapper.find(DummyComponent).simulateError(error);
    expect(wrapper.text()).toContain('Something went wrong.');
  });

  it('displays the section\'s name of which in the error was thrown', () => {
    wrapper.find(DummyComponent).simulateError(error);
    expect(wrapper.text()).toContain('Cannot render trip page');
  });
});
