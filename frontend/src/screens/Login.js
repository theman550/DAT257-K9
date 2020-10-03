import React from 'react';
import styled from 'styled-components';
import LoginForm from '../components/LoginForm';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Login = () => (
  <Container>
    <LoginForm />
  </Container>
);

export default Login;
