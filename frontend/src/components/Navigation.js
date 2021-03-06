import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  User,
  LogIn,
  LogOut,
  Map,
  MapPin,
} from 'react-feather';
import config from '../config';
import { H2 } from './UI';
import UserPayload from '../model/UserPayload';

const Nav = styled.nav`
  height: ${(props) => props.theme.size.navbar};
  display: flex;
  justify-content: space-between;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;

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

const NavIcon = styled.i`
  color: ${(props) => props.theme.colors.primary};
  margin-right: ${(props) => props.theme.spacing.subsection};
  cursor: pointer;
  
  &:hover {
    color: white;
  }
`;

const Navigation = ({ loggedInUser, setLoggedInUser }) => {
  const logout = async () => {
    try {
      await fetch(`${config.api.url}logout/`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: loggedInUser.token,
          loggedInEmail: loggedInUser.email,
        }),
      });

      setLoggedInUser(null);
    } catch (e) {
      console.error(`Failed to log out ${e.message}`);
    }
  };

  return (
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
      {loggedInUser !== null
        ? (
          <div>
            <Link aria-label="Trips" to="/trips"><NavIcon as={MapPin} /></Link>
            <Link aria-label="Account" to="/account"><NavIcon as={User} /></Link>
            <NavIcon as={LogOut} aria-label="Logout" onClick={logout} />
          </div>
        )
        : (
          <div>
            <Link aria-label="Login" to="/login"><NavIcon as={LogIn} /></Link>
          </div>
        )}
    </Nav>
  );
};

Navigation.propTypes = {
  loggedInUser: UserPayload,
  setLoggedInUser: PropTypes.func.isRequired,
};

Navigation.defaultProps = {
  loggedInUser: null,
};

export default Navigation;
