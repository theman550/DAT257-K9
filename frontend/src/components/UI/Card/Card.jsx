import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CardContainer = styled.div`
    background-color: ${(props) => props.theme.colors.fill};
    border-radius: 10px;
    overflow: hidden;

    /* -webkit-box-shadow: -20px 17px 36px 0px rgba(112,115,134,0.1);
    -moz-box-shadow: -20px 17px 36px 0px rgba(112,115,134,0.1);
    box-shadow: -20px 17px 36px 0px rgba(112,115,134,0.1); */

    -webkit-box-shadow: -10px 10px 40px 0px rgba(10,10,10,0.75);
    -moz-box-shadow: -10px 10px 40px 0px rgba(10,10,10,0.75);
    box-shadow: -10px 10px 40px 0px rgba(10,10,10,0.75);
`;

const Header = styled.div`
    min-height: 75px;
    position: relative;

    box-sizing: content-box;
    padding: ${(props) => props.theme.padding.section};

    background: -moz-linear-gradient(0deg, rgba(128,100,247,1) 0%, rgba(245,186,156,1) 100%); /* ff3.6+ */
    background: -webkit-gradient(linear, left top, right top, color-stop(0%, rgba(128,100,247,1)), color-stop(100%, rgba(245,186,156,1))); /* safari4+,chrome */
    background: -webkit-linear-gradient(0deg, rgba(128,100,247,1) 0%, rgba(245,186,156,1) 100%); /* safari5.1+,chrome10+ */
    background: -o-linear-gradient(0deg, rgba(128,100,247,1) 0%, rgba(245,186,156,1) 100%); /* opera 11.10+ */
    background: -ms-linear-gradient(0deg, rgba(128,100,247,1) 0%, rgba(245,186,156,1) 100%); /* ie10+ */
    background: linear-gradient(90deg, rgba(128,100,247,1) 0%, rgba(245,186,156,1) 100%); /* w3c */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#8064f7', endColorstr='#f5ba9c',GradientType=1 ); /* ie6-9 */
`;

const Body = styled.div`
    box-sizing: content-box;
    padding: ${(props) => props.theme.padding.sectionAccent};
`;
const Card = ({ headerContent, bodyContent }) => (
  <CardContainer>
    <Header>
      {headerContent}
    </Header>
    <Body>
      {bodyContent}
    </Body>
  </CardContainer>
);

Card.propTypes = {
  headerContent: PropTypes.element.isRequired,
  bodyContent: PropTypes.element.isRequired,
};

export default Card;
