import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Navigation from './components/Navigation';
import Trips from './screens/Trips';
import Notification from './components/Notification';
import theme from './themes/base';
import Account from './screens/Account';

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
          <Route path="/account">
            <Account />
          </Route>
          <Route path="/">
            <Trips />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
