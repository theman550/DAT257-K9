import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';
import { LogIn, Map } from 'react-feather';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  position: fixed;
  z-index: 1;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  padding: ${props => props.theme.padding.section};
`;

const Navigation = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <Nav>
      <Link to="/account"><LogIn color={themeContext.colors.primary} /></Link>
      <Link to="/"><Map color={themeContext.colors.primary} /></Link>
    </Nav>
  )
};

export default Navigation;
