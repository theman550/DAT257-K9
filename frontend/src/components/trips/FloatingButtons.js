import React from 'react';
import styled from 'styled-components';
import { Search, Plus } from 'react-feather';
import { PrimaryButton } from '../UI';

const ButtonContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;  
  display: flex;
  justify-content: space-evenly;
`;

const RoundButton = styled(PrimaryButton)`
  font-family: Arial;
  padding: 0.75rem;
  margin: 1rem;
  border-radius: 50%;
  -webkit-box-shadow: -10px 10px 40px 0px rgba(10,10,10,0.75);
  -moz-box-shadow: -10px 10px 40px 0px rgba(10,10,10,0.75);
  box-shadow: -10px 10px 40px 0px rgba(10,10,10,0.75);
`;

const FloatingButtons = ({ openSearch, openAdd }) => (
  <ButtonContainer>
    <RoundButton onClick={openSearch}>
      <Search />
    </RoundButton>
    <RoundButton onClick={openAdd}>
      <Plus />
    </RoundButton>
  </ButtonContainer>
);

export default FloatingButtons;
