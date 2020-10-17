import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LoginForm from '../components/LoginForm';
import UserPayload from '../model/UserPayload';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.padding.section};
`;

const Login = ({ loggedInUser, setLoggedInUser, showNotification }) => (
  <Container>
    <LoginForm
      loggedInUser={loggedInUser}
      setLoggedInUser={setLoggedInUser}
      showNotification={showNotification}
    />
  </Container>
);

Login.propTypes = {
  loggedInUser: UserPayload,
  setLoggedInUser: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
};

Login.defaultProps = {
  loggedInUser: null,
};

export default Login;
