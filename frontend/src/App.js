import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import theme from './themes/base';
import Navigation from './components/Navigation';
import Notification from './components/Notification';
import Trips from './screens/Trips';
import Login from './screens/Login';
import RegisterForm from './components/Form';
import ErrorBoundary from './components/ErrorBoundary';
import Account from './screens/Account';

const PageWrapper = styled.div`
  margin-top: ${(props) => props.theme.size.navbar};
`;

const App = () => {
  const [notification, setNotification] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const showNotification = (msg, color, seconds) => {
    setNotification({ msg, color });
    setTimeout(() => {
      setNotification(null);
    }, seconds * 1000);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navigation
          loggedInUser={loggedInUser}
          setLoggedInUser={setLoggedInUser}
        />
        <PageWrapper>
          {notification
            && (
            <Notification
              msg={notification.msg}
              color={notification.color}
            />
            )}
          <Switch>
            <Route path="/login">
              <Login
                showNotification={showNotification}
                setLoggedInUser={setLoggedInUser}
              />
            </Route>
            <Route path="/register">
              <ErrorBoundary sectionName="Register page">
                <RegisterForm
                  showNotification={showNotification}
                  setLoggedInUser={setLoggedInUser}
                />
              </ErrorBoundary>
            </Route>
            <Route path="/account">
              <ErrorBoundary sectionName="Account page">
                <Account
                  showNotification={showNotification}
                  loggedInUser={loggedInUser}
                />
              </ErrorBoundary>
            </Route>
            {loggedInUser !== null
              && (
              <Route path="/trips">
                <ErrorBoundary sectionName="Trip page">
                  <Trips
                    showNotification={showNotification}
                    loggedInUser={loggedInUser}
                  />
                </ErrorBoundary>
              </Route>
              )}
            <Route path="/">
              <ErrorBoundary sectionName="Welcome page">
                <p>Welcome to Share-a-ride</p>
              </ErrorBoundary>
            </Route>
          </Switch>
        </PageWrapper>
      </Router>
    </ThemeProvider>
  );
};

export default App;
