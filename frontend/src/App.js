import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Navigation from './components/Navigation';

/**
 * Access like this:
 * const MyFancyButton = styled.button`
 * background: ${props => props.theme.colors.primary}
 * `
 */
const theme = {
  colors: {
    primary: '#8064f7',
    secondary: '#f5ba9c',
    fill: '#1a1a1a',
    alternateFill: '#f0ebff',
    inactive: '#707386',
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navigation />
        <Switch>
          <Route path="/search">
            <p>Search page</p>
          </Route>
          <Route path="/add">
            <p>Add trip page</p>
          </Route>
          <Route path="/login">
            <p>Login page</p>
          </Route>
          <Route path="/">
            <p>Home page</p>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
