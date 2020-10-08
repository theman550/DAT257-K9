import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { User } from 'react-feather';
import {
  FieldFactory,
  PrimaryButton,
  Label,
} from './UI';

const StyledInput = FieldFactory(styled.input``);

const Icon = styled(User)`
margin-left:40%;

`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.fill};
  padding: ${(props) => props.theme.padding.section};
  margin: 30% auto;
  width: 90%;
  max-width: 26rem;
  border-radius: ${(props) => props.theme.size.corner};
  -webkit-box-shadow: -10px 10px 40px 0px rgba(10,10,10,0.75);
  -moz-box-shadow: -10px 10px 40px 0px rgba(10,10,10,0.75);
  box-shadow: -10px 10px 40px 0px rgba(10,10,10,0.75);
`;

const StyledTextRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${(props) => props.theme.spacing.subsection};
  &:nth-child(1) {
    margin: 0;
  }
`;

const StyledSelectRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: ${(props) => props.theme.spacing.subsection};
`;
const Button = css`
  padding: ${(props) => props.theme.size.button};
  width: 100%;
  margin-top: ${(props) => props.theme.spacing.subsection};
`;

const StyledPrimaryButton = styled(PrimaryButton)`
  ${Button}
  margin-left: ${(props) => props.theme.spacing.subsection};
`;


const Login = ({ showNotification }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

      const newvalue = {
      Email: username,
      Password: password,
    };

    fetch('http://spilg.xyz/api/login/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newvalue),
    })
      .then((response) => response)
      .then((data) => {
        console.log(data);
        if (data.status === 400) {
          showNotification('Invalid input ! ', '#CC354E', '5');
          console.log('Bad request');
        } else if (data.status === 201) {
          showNotification('Signed in sucessfully :)', '#378C2E', '7');
        }
      });
  };

  return (
    <StyledForm aria-label="Signin form" onSubmit={handleSubmit}>
      <StyledTextRow>
        <Icon size={55} color="#8064f7" />

      </StyledTextRow>
      <StyledTextRow>
        <Label htmlFor="username">Username</Label>
        <StyledInput
          type="email"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username.."
        />
      </StyledTextRow>
      <StyledTextRow>
        <Label htmlFor="password">Password</Label>
        <StyledInput
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password..."
        />
      </StyledTextRow>
      <StyledTextRow>
        <div className="checkbox">
          <input type="checkbox"  id="customCheck1" />
          <Label htmlFor="customCheck1"> Remember me</Label>
        </div>
      </StyledTextRow>

      <StyledSelectRow>
        <StyledPrimaryButton type="submit">Sign In</StyledPrimaryButton>
      </StyledSelectRow>
    </StyledForm>
  );
};

Login.propTypes = {
  showNotification: PropTypes.func.isRequired,
};

export default Login;
