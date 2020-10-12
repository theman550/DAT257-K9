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

const Account = ({ setIsLoggedIn }) => (
  <Container>
    <Login setIsLoggedIn={setIsLoggedIn} />
  </Container>
);

Account.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default Account;
