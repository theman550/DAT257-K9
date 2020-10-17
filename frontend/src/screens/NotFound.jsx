import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { H2, H4 } from '../components/UI/Typography';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .spacing {
    margin-bottom: ${(props) => props.theme.spacing.subsection};
  }
`;

const H1 = styled(H2)`
  font-size: 10em;
`;

const Links = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;

  & > *:not(:last-child) {
    margin-right: ${(props) => props.theme.spacing.section};
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;

  & > * {
    color: ${(props) => props.theme.colors.inactive};
    text-decoration: underline;

    transition: all .2s ease-in-out;
    &:hover {
      color: white;
    }
  }
`;

const NotFound = () => (
  <Wrapper>
    <H1>404</H1>
    <H2 className="spacing">Not found</H2>
    <Links>
      <StyledLink aria-label="Home" to="/">
        <H4>Home</H4>
      </StyledLink>
      <StyledLink aria-label="Trips" to="/trips">
        <H4>Trips</H4>
      </StyledLink>
      <StyledLink aria-label="Login" to="/login">
        <H4>Login</H4>
      </StyledLink>
    </Links>
  </Wrapper>
);

export default NotFound;
