import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import config from '../../config';

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
  padding: ${props => props.theme.padding.section};
  margin: 30% auto;
  width: 90%;
  max-width: 26rem;
  border-radius: ${props => props.theme.size.corner};
  -webkit-box-shadow: -10px 10px 40px 0px rgba(10,10,10,0.75);
  -moz-box-shadow: -10px 10px 40px 0px rgba(10,10,10,0.75);
  box-shadow: -10px 10px 40px 0px rgba(10,10,10,0.75);
`;

const StyledTextRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${props => props.theme.spacing.subsection};

  &:nth-child(1) {
    margin: 0;
  }
`;

const StyledSelectRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: ${props => props.theme.spacing.subsection};
`;

const StyledSelectColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  & input::-webkit-calendar-picker-indicator {
    display: none;
  }

  &:nth-child(2) {
    margin-left: ${props => props.theme.spacing.subsection};
  }

  & > div {
    margin-top: 0;
  }
`;

const StyledButton = styled(PrimaryButton)`
  padding: ${props => props.theme.size.button};
  width: 100%;
  margin-top: ${props => props.theme.spacing.subsection};

  &:nth-of-type(1) {
    margin-right: ${props => props.theme.spacing.subsection};
  }

  &:nth-of-type(2) {
    margin-left: ${props => props.theme.spacing.subsection};
  }
`;

const SearchTrips = ({ closeSearch, setFilteredTrips }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [datetime, setDatetime] = useState(
    new Date().toISOString().slice(0, 19)
  );
  const [seats, setSeats] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    const createQuery = () => {
      let query = '';

      if (from !== '') query += 'startLocation=' + from + '&';
      if (to !== '') query += 'destination=' + to + '&';
      if (datetime !== '') query += 'startTime=' + datetime + '&';
      if (seats !== '') query += 'seatsAvailable=' + seats + '&';
      if (minPrice !== '') query += 'priceMin=' + minPrice + '&';
      if (maxPrice !== '') query += 'priceMax=' + maxPrice;

      return query;
    }

    try {
      const res = await fetch(`${config.api.url}trips?${createQuery()}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.data || data.message || 'No error message provided');
      }

      setFilteredTrips(
        data
          .map((trip) => ({
            ...trip,
            driver: 'John Doe',
            startTime: new Date(trip.startTime),
            seatsAvailable: Number.parseInt(trip.seatsAvailable, 10),
            price: Number.parseInt(trip.price, 10),
          })),
      );
    } catch (error) {
      console.warn('Could not retrieve trips', error.message);
    }
  }

  return (
    <StyledForm aria-label="Search form" onSubmit={handleSubmit}>
      <StyledTextRow>
        <Label htmlFor="from">From</Label>
        <StyledInput
          type="text"
          id="from"
          value={from}
          onChange={e => setFrom(e.target.value)}
          placeholder="Enter start location..."
        />
      </StyledTextRow>
      <StyledTextRow>
        <Label htmlFor="to">To</Label>
        <StyledInput
          type="text"
          id="to"
          value={to}
          onChange={e => setTo(e.target.value)}
          placeholder="Enter destination..."
        />
      </StyledTextRow>
      <StyledSelectRow>
        <StyledSelectColumn>
          <Label htmlFor="datetime">Date/time</Label>
          <StyledInput
            type="datetime-local"
            id="datetime"
            value={datetime}
            onChange={e => setDatetime(e.target.value)}   
          />
        </StyledSelectColumn>
      </StyledSelectRow>
      <StyledSelectRow>
        <StyledSelectColumn>
          <Label htmlFor="seats">Seats</Label>
          <StyledInput
            type="number"
            id="seats"
            min="1"
            max="100"
            value={seats}
            onChange={e => setSeats(e.target.value)}
            placeholder='Enter seats...'
          />
        </StyledSelectColumn>
        <StyledSelectColumn>
          <Label htmlFor="price">Price</Label>
          <StyledSelectRow id='price'>
            <StyledInput
              type="number"
              min="0"
              max="1000"
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)}
              placeholder='Min'
            />
            <StyledInput
              type="number"
              min="0"
              max="1000"
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
              placeholder='Max'
            />
          </StyledSelectRow>
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
  setFilteredTrips: PropTypes.func.isRequired
};

export default SearchTrips;
