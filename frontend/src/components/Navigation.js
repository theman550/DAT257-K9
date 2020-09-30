import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LogIn, Map, MapPin } from 'react-feather';
import { H2 } from './UI';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  position: fixed;
  z-index: 1;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  padding: ${(props) => props.theme.padding.section};

  & > div {
    display: flex;
    align-items: center;
  }
`;

const StyledH2 = styled(H2)`
  margin-left: ${(props) => props.theme.spacing.subsection};

  & > a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: ${(props) => props.theme.colors.primary};
  }

  & > a:hover {
    color: white;
  }

  & > a > span {
    margin-top: ${(props) => props.theme.spacing.vNeighbor};
    margin-left: ${(props) => props.theme.spacing.hNeighbor};
  }

  @media only screen and (max-width: 48em) {
    & > a > span {
      display: none;
    }
  }
`;

const StyledLogInIcon = styled(LogIn)`
  color: ${(props) => props.theme.colors.primary};
  margin-left: ${(props) => props.theme.spacing.subsection};
  margin-right: ${(props) => props.theme.spacing.subsection};
  
  &:hover {
    color: white;
  }
`;

const StyledMapPinIcon = styled(MapPin)`
  color: ${(props) => props.theme.colors.primary};
  
  &:hover {
    color: white;
  }
`;

const Navigation = () => (
  <Nav>
    <StyledH2>
      <Link aria-label="Home" to="/">
        <Map />
        <span>
          {' '}
          Share-a-ride
        </span>
      </Link>
    </StyledH2>
    <div>
      <Link aria-label="Trips" to="/trips"><StyledMapPinIcon /></Link>
      <Link aria-label="Account" to="/account"><StyledLogInIcon /></Link>
    </div>
  </Nav>
);

export default Navigation;
