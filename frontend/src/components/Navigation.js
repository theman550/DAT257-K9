import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LogIn, Map } from 'react-feather';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  position: fixed;
  z-index: 1;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  padding: ${props => props.theme.padding.section};
`;

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
      <Link aria-label='Account' to="/account"><StyledLogInIcon /></Link>
      <Link aria-label='Trips' to="/"><StyledMapIcon /></Link>
    </Nav>
  )
};

export default Navigation;
