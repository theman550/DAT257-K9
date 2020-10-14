import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LoginForm from '../components/LoginForm';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.padding.section};
`;

const Account = ({ setLoggedInUser, showNotification }) => (
  <Container>
    <LoginForm
      setLoggedInUser={setLoggedInUser}
      showNotification={showNotification}
    />
  </Container>
);

Account.propTypes = {
  setLoggedInUser: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
};

export default Account;
