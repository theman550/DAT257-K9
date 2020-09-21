import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Notification from './components/Notification';

const App = () => {
  const [notification, setNotification] = useState(null);

  const showNotification = (msg, color, seconds) => { // eslint-disable-line
    setNotification({ msg, color });
    setTimeout(() => {
      setNotification(null);
    }, seconds * 1000);
  };

  return (
    <Router>
      <Navigation />
      {notification
        && <Notification msg={notification.msg} color={notification.color} />}
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
  );
};

export default App;
