import React, { useState } from 'react';
import styled from 'styled-components';
import config from '../config';
import Spinner from './Spinner';

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
`;
const H3 = styled.h3`
padding-top: 40px;
color: #8C55AA;
font-family: 'Ubuntu', sans-serif;
font-weight: bold;
font-size: 23px;
margin-left:150px;
`;
const Label = styled.label`
color: #9677D9;
font-size: large;
`;
const P = styled.p`
color: #9677D9;
font-size: large;
`;
const Div = styled.div`
.form-group{
margin-top:20px;
}
`;
const A = styled.a`
color: white;
font-size: large;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    fetch(`${config.api.url}login/`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => response)
      .then((data) => {
        setIsLoading(false);
        console.log(data);
        // TODO: redirect
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <H3>Sign In</H3>

      <div className="form-group">

        <Input data-testid="email" type="email" className="form-control" align="center" name={email} placeholder="Enter email" onChange={(event) => setEmail(event.target.value)} />
      </div>

      <div className="form-group">

        <Input data-testid="password" type="password" className="form-control" align="center" name={password} placeholder="Enter password" onChange={(event) => setPassword(event.target.value)} />
      </div>

      <Div className="form-group">
        <div className="custom-control custom-checkbox">
          <input type="checkbox" className="custom-control-input" id="customCheck1" />
          <Label className="custom-control-label" htmlFor="customCheck1">Remember me</Label>
        </div>
      </Div>

      <Button type="submit" className="button">
        {isLoading
          ? <Spinner />
          : 'Submit'}
      </Button>
      <P className="forgot-password text-right">
        Forgot
        <A href="#">password?</A>
      </P>
    </Form>
  );
};

export default Login;
