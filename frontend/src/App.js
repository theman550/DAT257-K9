import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import theme from './themes/base';
import Navigation from './components/Navigation';
import Notification from './components/Notification';
import Trips from './screens/Trips';
import Account from './screens/Account';
import RegisterForm from './components/Form';

const PageWrapper = styled.div`
  margin-top: ${(props) => props.theme.size.navbar};
`;

const App = () => {
  const [notification, setNotification] = useState(null);

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
        <PageWrapper>
          {notification
            && <Notification msg={notification.msg} color={notification.color} />}
          <Switch>
            <Route path="/account">
              <Account />
            </Route>
            <Route path="/register">
              <RegisterForm />
            </Route>
            <Route path="/trips">
              <Trips showNotification={showNotification} />
            </Route>
            <Route path="/">
              <p>Welcome to Share-a-ride</p>
            </Route>
          </Switch>
        </PageWrapper>
      </Router>
    </ThemeProvider>
  );
};

export default App;
