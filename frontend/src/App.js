import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Navigation from './components/Navigation';
import Trips from './screens/Trips';
import AddTrip from './components/AddTrip';
import Notification from './components/Notification';
import Login from './components/Login';
import theme from './themes/base';

const App = () => {
  const [notification, setNotification] = useState(null);

  // TODO: First to use this function can remove the next line
  // eslint-disable-next-line
  const showNotification = (msg, color, seconds) => {
    setNotification({ msg, color });
    setTimeout(() => {
      setNotification(null);
    }, seconds * 1000);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navigation />
        {notification
          && <Notification msg={notification.msg} color={notification.color} /> }
        <Switch>
          <Route path="/trips">
            <Trips />
          </Route>
          <Route path="/search">
            <p>Search page</p>
          </Route>
          <Route path="/add">
            <p>Add trip page</p>
            <AddTrip />
          </Route>
          <Route path="/login">
            <p>Login page</p>
            <Login />
          </Route>
          <Route path="/">
            <p>Home page</p>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
