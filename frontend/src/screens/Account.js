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

const Account = ({ showNotification }) => (
  <Container>
    <Login showNotification={showNotification} />
  </Container>
);

Account.propTypes = {
  showNotification: PropTypes.func.isRequired,
};

export default Account;
