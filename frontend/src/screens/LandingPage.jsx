import React from 'react';
import styled from 'styled-components';
import { Map } from 'react-feather';
import BackgroundImage from '../img/background.jpg';
import { H2, P } from '../components/UI/Typography';

const Backdrop = styled.div`
  background-image: url(${BackgroundImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: calc(100vh - ${(props) => props.theme.size.navbar});
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  backdrop-filter: brightness(30%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Logo = styled(H2)`
  display: flex;
  color: ${(props) => props.theme.colors.primary};
  font-size: 6rem;

  @media only screen and (max-width: 70rem) {
    font-size: 4rem;
  }

  @media only screen and (max-width: 40rem) {
    font-size: 2.5rem;
  }
`;

const Slogan = styled(H2)`
  color: ${(props) => props.theme.colors.primary};
  font-size: 2rem;
  margin: 1rem;
  margin-top: 2rem;
  text-align: center;

  @media only screen and (max-width: 70rem) {
    font-size: 1.4rem;
  }

  @media only screen and (max-width: 40rem) {
    font-size: 1.2rem;
  }
`;

const StyledMap = styled(Map)`
  width: 6rem;
  height: 6rem;

  @media only screen and (max-width: 70rem) {
    width: 4rem;
    height: 4rem;
  }

  @media only screen and (max-width: 40rem) {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

const StyledSpan = styled.span`
  margin-left: 1rem;
`;

const StyledP = styled(P)`
  width: 80%;
  text-align: center;

  @media only screen and (max-width: 70rem) {
    font-size: 0.9rem;
  }
`;

const LandingPage = () => (
  <Backdrop>
    <Container>
      <Logo>
        <StyledMap />
        <StyledSpan>
          Share-a-ride
        </StyledSpan>
      </Logo>
      <Slogan>We ignite opportunity by setting the world in motion</Slogan>
      <StyledP>
        Good things happen when people can move, whether across town or toward
        their dreams.
        Opportunities appear, open up, become reality.
        What started as a way to tap a button to get a ride hasled to billions of
        moments of human connection as people around the world go all kinds of places
        in all kinds of ways with the help of our technology.
      </StyledP>
    </Container>
  </Backdrop>
);

export default LandingPage;
