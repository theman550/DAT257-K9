import React, { useState } from 'react';
<<<<<<< HEAD
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

=======
import styled from 'styled-components';
import config from '../config';

const Form = styled.form`
background-color: #262626;
width: 400px;
height: 400px;
margin: 7em auto;
border-radius: 1.5em;
box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.14)
`;
const Button = styled.button`
position: relative;
margin: 15px 0 5px 0;
margin-top: 0px;
margin-left:80px;
left: 30%;
transform: translateX(-50%);
background: #9677D9;
border: none;
border-radius: 5px;
padding: 10px;
color: white;
width: 30%;
font-family: "Noto Sans", sans-serif;
font-size: 14px;
cursor: pointer;
    `;
const Input = styled.input`
border: none;
border-bottom: 1px solid #333;
background-color: #262626;
margin-bottom: 60px;
width: 90%;
font-size: 18px;
line-height: 1.2;
outline: none;
color: #9677D9;
::-webkit-input-placeholder { /* Chrome/Opera/Safari */
color: #9677D9;
font-size: medium;
font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
opacity: 0.3;
}
>>>>>>> origin
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

<<<<<<< HEAD
      const newvalue = {
      Email: username,
      Password: password,
    };

    fetch('http://spilg.xyz/api/login/', {
=======
    fetch(`${config.api.url}login/`, {
>>>>>>> origin
      method: 'POST',
      mode: 'cors',
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
