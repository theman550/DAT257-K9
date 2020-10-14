import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Login from '../components/Login';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Account = ({ loggedInUser, setLoggedInUser }) => (
  <Container>
    <Login
      loggedInUser={loggedInUser}
      setLoggedInUser={setLoggedInUser}
    />
  </Container>
);

Account.propTypes = {
  loggedInUser: PropTypes.shape({
    token: PropTypes.string,
    email: PropTypes.string,
  }),
  setLoggedInUser: PropTypes.func.isRequired,
};

Account.defaultProps = {
  loggedInUser: null,
};

export default Account;
