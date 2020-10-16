import React from 'react';
import styled from 'styled-components';
import { H2, P } from './UI/Typography';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const H1 = styled(H2)`
  font-size: 50px;
  text-align:center;
  color: ${(props) => props.theme.colors.primary};
  margin-right: ${(props) => props.theme.spacing.subsection};
  margin-left: ${(props) => props.theme.spacing.subsection};
`;

const P1 = styled(P)`
  position: relative;
  padding: ${(props) => props.theme.padding.section};
  width: 70%;
  font-size: 22px;
  line-height: 1.5;
  margin-left: 18%;
  margin-right: 10%;
`;

const Div = styled.div`
  margin-top:10%;
`;

const About = () => (
  <Wrapper>
    <Div className="container">
      <H1>About Us</H1>
      <br />
      <P1>
        <ul>
          <li>
            Simple steps to create an acount and sign in easily next time.
          </li>
          <li>
            Search a trip or add one easily in one click, we have trips
            covering almost every major city.
          </li>
          <li>
            Facility to book the ride or cancel it.
          </li>
          <li>
            Price feature allows the users to get details regarding the
            different prices for different locations.
          </li>
          <li>
            Contribute to ease traffic congesion and reduce the pollution.
          </li>
        </ul>
      </P1>
    </Div>
  </Wrapper>
);

export default About;
