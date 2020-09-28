import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LogIn, Map } from 'react-feather';
import { H2 } from '../components/UI';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  position: fixed;
  z-index: 1;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  padding: ${props => props.theme.padding.section};

  @media only screen and (min-width: 765px) {
    & > h2 {
      flex-grow: 20;
    }
       
    & > a {
      flex-grow: 1;
    }
  }
`;

const StyledH2 = styled(H2)`
  @media only screen and (max-width: 765px) {
    display: none;
  }
`

const StyledLogInIcon = styled(LogIn)`
  color: ${props => props.theme.colors.primary};
  
  &:hover {
    color: white;
  }
`

const StyledMapIcon = styled(Map)`
  color: ${props => props.theme.colors.primary};
  
  &:hover {
    color: white;
  }
`

const Navigation = () => {
  return (
    <Nav>
      <StyledH2>Share-a-ride</StyledH2> 
      <Link aria-label='Account' to="/account"><StyledLogInIcon /></Link>
      <Link aria-label='Trips' to="/"><StyledMapIcon /></Link>
    </Nav>
  )
};

export default Navigation;
