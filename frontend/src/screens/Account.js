import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Login from '../components/Login';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.padding.section};
`;

const Account = ({ loggedInUser, setLoggedInUser, showNotification }) => (
  <Container>
    <Login
      loggedInUser={loggedInUser}
      setLoggedInUser={setLoggedInUser}
      showNotification={showNotification}
    />
  </Container>
);

Account.propTypes = {
  loggedInUser: PropTypes.shape({
    token: PropTypes.string,
    email: PropTypes.string,
  }),
  setLoggedInUser: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
};

Account.defaultProps = {
  loggedInUser: null,
};

export default Account;
