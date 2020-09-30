import React from 'react';
import styled from 'styled-components';
import Login from '../components/Login';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Account = () => (
  <Container>
    <Login />
  </Container>
);

export default Account;
