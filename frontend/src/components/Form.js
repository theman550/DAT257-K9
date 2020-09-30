import React, { useState } from 'react';
import styled from 'styled-components';

const F = styled.form`
    box-sizing: border-box;
    font-family: "Roboto", sans-erif;
    width: 100%;
    border-radius: 5px;
    background:#262626;
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
    text-align: center;
    position: absolute;
    top: 56%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-size: cover;
    border-radius: 5px;
    font-size: medium;
    `;

const H1 = styled.h1`
    font-size: 38px;
    text-align:center;
    color: #9677D9;
    `;
const Table = styled.table`
    margin-left: auto;
    margin-right: auto;
    `;
const InputText = styled.input`
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border: none;
    border-radius: 15px;
    background-color: rgb(255, 249, 249);
    color: rgb(10, 10, 10);
    font-family: Arial, Helvetica, sans-serif;
    `;
const InputPassword = styled.input`
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border: none;
    border-radius: 15px;
    background-color: rgb(255, 249, 249);
    color: rgb(10, 10, 10);
    font-family: Arial, Helvetica, sans-serif;
    `;
const InputSub = styled.input`
    width: 60%;
    padding: 12px 20px;
    margin: 8px 0;
    background: #9677D9;
    border: none;
    border-radius: 15px;
    padding: 10px;
    color: white;
    font-family: "Noto Sans", sans-serif;
    font-size: 14px;
    cursor: pointer;
    `;
const Form = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://spilg.xyz/api/user/', {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname: firstName,
        lastname: lastName,
        email,
        password,
      }),
    }).then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };
  return (
    <F onSubmit={handleSubmit}>
      <H1>User account</H1>
      <Table className="center">
        <tbody>
          <tr>
            <td>
              <InputText type="text" alt="firstName" name={firstName} onChange={(event) => setFirstName(event.target.value)} placeholder="First name" />
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>
              <InputText type="text" alt="lastName" name={lastName} onChange={(event) => setLastName(event.target.value)} placeholder="Last name" />
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>
              <InputText type="text" alt="email" name={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" />
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>
              <InputText type="text" alt="userName" name={userName} onChange={(event) => setUserName(event.target.value)} placeholder="User name" />
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>
              <InputPassword type="password" alt="password" name={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" />
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>
              <InputPassword type="password" alt="confirmPassword" name={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Confirm password" />
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>
              <InputSub type="submit" alt="submit" value="Submit" />
            </td>
          </tr>
        </tbody>
      </Table>
    </F>
  );
};

export default Form;
