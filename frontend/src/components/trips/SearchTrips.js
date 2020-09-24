import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  FieldFactory,
  PrimaryButton,
  Label,
} from '../UI';

const StyledInput = FieldFactory(styled.input``);

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.fill};
  padding: 1rem;
  margin: 30% auto;
  width: 80%;
  max-width: 400px;
  border-radius: 10px;
  -webkit-box-shadow: -10px 10px 40px 0px rgba(10,10,10,0.75);
  -moz-box-shadow: -10px 10px 40px 0px rgba(10,10,10,0.75);
  box-shadow: -10px 10px 40px 0px rgba(10,10,10,0.75);
`;

const StyledTextRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.75rem;

  &:nth-child(1) {
    margin: 0;
  }
`;

const StyledSelectRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.75rem;
`;

const StyledSelectColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  & input::-webkit-calendar-picker-indicator {
    display: none;
  }

  &:nth-child(1) {
    margin-right: 1rem;
  }

  &:nth-child(2) {
    margin-left: 1rem;
  }
`;

const StyledButton = styled(PrimaryButton)`
  padding: 0.75rem;
  height: 80%;
  width: 100%;
  margin-top: 0.75rem;

  &:nth-of-type(1) {
    margin-right: 0.75rem;
  }

  &:nth-of-type(2) {
    margin-left: 0.75rem;
  }
`;

const SearchTrips = ({ closeSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('searching...');

    closeSearch();
  };

  return (
    <StyledForm aria-label="Search form" onSubmit={handleSubmit}>
      <StyledTextRow>
        <Label htmlFor="from">From</Label>
        <StyledInput type="text" id="from" placeholder="Enter start location..." />
      </StyledTextRow>
      <StyledTextRow>
        <Label htmlFor="to">To</Label>
        <StyledInput type="text" id="to" placeholder="Enter destination..." />
      </StyledTextRow>
      <StyledSelectRow>
        <StyledSelectColumn>
          <Label htmlFor="date">Date</Label>
          <StyledInput type="date" id="date" />
        </StyledSelectColumn>
        <StyledSelectColumn>
          <Label htmlFor="time">Time</Label>
          <StyledInput type="time" id="time" />
        </StyledSelectColumn>
      </StyledSelectRow>
      <StyledSelectRow>
        <StyledSelectColumn>
          <Label htmlFor="seats">Seats</Label>
          <StyledInput type="number" id="seats" min="0" max="4" />
        </StyledSelectColumn>
        <StyledSelectColumn>
          <Label htmlFor="price">Price</Label>
          <StyledInput type="number" id="price" min="0" max="1000" />
        </StyledSelectColumn>
      </StyledSelectRow>
      <StyledSelectRow>
        <StyledButton onClick={closeSearch}>Close</StyledButton>
        <StyledButton type="submit">Search</StyledButton>
      </StyledSelectRow>
    </StyledForm>
  );
};

SearchTrips.propTypes = {
  closeSearch: PropTypes.func.isRequired,
};

export default SearchTrips;
