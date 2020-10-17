import React from 'react';
import styled from 'styled-components';
import { Loader } from 'react-feather';

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RotatingSpinner = styled(Loader)`
  color: white;
  animation-name: spin;
  animation-duration: 5000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  @keyframes spin {
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
  }
`;

const Spinner = () => (
  <SpinnerContainer>
    <RotatingSpinner />
  </SpinnerContainer>
);

export default Spinner;
