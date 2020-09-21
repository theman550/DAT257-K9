import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledDiv = styled.div`
  font-family: Kufam;
  color: white;
  background-color: ${props => props.color};
  border-radius: 0.2rem;
  margin: 0.2rem;
  padding: 1rem;
  text-align: center;
`;

const Notification = ({ msg, color }) => (
  <StyledDiv color={color}>
    {msg}
  </StyledDiv>
);

Notification.propTypes = {
  msg: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Notification;
