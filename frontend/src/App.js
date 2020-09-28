import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Navigation from './components/Navigation';
import Login from './components/Login';

  return (
<<<<<<< HEAD
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
          <Login />
        </Route>
        <Route path="/">
          <p>Home page</p>
        </Route>
      </Switch>
    </Router>
=======
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
