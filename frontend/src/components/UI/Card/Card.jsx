import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CardContainer = styled.div`
    background-color: ${(props) => props.theme.colors.fill};
    border-radius: ${(props) => props.theme.size.corner};
    overflow: hidden;

    -webkit-box-shadow: -10px 10px 30px 5px rgba(10,10,10,0.95);
    -moz-box-shadow: -10px 10px 30px 5px rgba(10,10,10,0.95);
    box-shadow: -10px 10px 30px 5px rgba(10,10,10,0.95);
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
