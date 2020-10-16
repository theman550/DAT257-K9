import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import styled, { css, withTheme } from 'styled-components';
import config from '../../config';
import ThemeShape from '../../model/ThemeShape';
import {
  FieldFactory,
  PrimaryButton,
  Label,
  InactiveButton,
} from '../UI';
import Spinner from '../Spinner';
import kommuner from './kommuner.json';
import DropDown from './DropDown';
import UserPayload from '../../model/UserPayload';

const StyledInput = FieldFactory(styled.input``);
const StyledTextArea = FieldFactory(styled.textarea``);

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.fill};
  padding: 1rem;
  margin: 30% auto;
  margin-top:30%;
  width: 80%;
  color:white;
  max-width: 400px;
  border-radius: 10px;
  -webkit-box-shadow: -10px 10px 40px 0px rgba(10,10,10,0.75);
  -moz-box-shadow: -10px 10px 40px 0px rgba(10,10,10,0.75);
  box-shadow: -10px 10px 40px 0px rgba(10,10,10,0.75);
`;

const StyledTextRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${(props) => props.theme.spacing.subsection};

  &:nth-child(1) {
    margin: 0;
  }
`;

const StyledSelectRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: ${(props) => props.theme.spacing.subsection};
`;

const StyledSelectColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  & input::-webkit-calendar-picker-indicator {
    display: none;
  }

  &:nth-child(2) {
    margin-left: ${(props) => props.theme.spacing.subsection};
  }

  & > div {
    margin-top: 0;
  }
`;

const Button = css`
  padding: ${(props) => props.theme.size.button};
  width: 100%;
  margin-top: ${(props) => props.theme.spacing.subsection};
`;

const StyledPrimaryButton = styled(PrimaryButton)`
  ${Button}
  margin-left: ${(props) => props.theme.spacing.subsection};
`;

const StyledInactiveButton = styled(InactiveButton)`
  ${Button}
  margin-right: ${(props) => props.theme.spacing.subsection};
`;

const AddTrip = ({
  closeAdd,
  showNotification,
  loggedInUser,
  theme,
}) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [datetime, setDatetime] = useState('');
  const [seats, setSeats] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadingData = () => {
    setOptions(kommuner.map((detail) => detail.Kommun));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newvalues = {
      startLocation: from,
      destination: to,
      seatsAvailable: seats,
      startTime: datetime,
      price,
      description,
      loggedInEmail: loggedInUser.email,
      token: loggedInUser.token,
    };

    fetch(`${config.api.url}trips/`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newvalues),

    }).then((respones) => respones).then((data) => {
      if (data.status === 400) {
        showNotification('Sorry ! this is bad request , You should try agian with valid inputs ', theme.colors.error, '5');
        console.log('Bad request');
      } else if (data.status === 201) {
        showNotification('Your trip is added succesfully :)', theme.colors.success, '7');
      }

      setIsLoading(false);
    })
      .catch((error) => {
        setIsLoading(false);
        showNotification(`Failed to add trip: ${error.message}`);
      });
  };

  useEffect(() => { loadingData(); }, []);
  return (
    <StyledForm aria-label="Add form" onSubmit={onSubmit}>
      <StyledTextRow>
        <Label htmlFor="from">From</Label>
        <DropDown
          items={options}
          valueChange={(value) => setFrom(value)}
          placeholder="Enter start location..."
          id="from"
        />
      </StyledTextRow>

      <StyledTextRow>
        <Label htmlFor="to">To</Label>
        <DropDown
          items={options}
          valueChange={(value) => setTo(value)}
          placeholder="Enter destination..."
          id="to"
        />
      </StyledTextRow>

      <StyledSelectRow>
        <StyledSelectColumn>
          <Label htmlFor="datetime">Date/time</Label>
          <StyledInput
            type="datetime-local"
            id="datetime"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
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
            onChange={(e) => setSeats(e.target.value)}
            placeholder="Enter seats..."
          />
        </StyledSelectColumn>

        <StyledSelectColumn>
          <Label htmlFor="price">Price</Label>
          <StyledInput
            type="number"
            min="0"
            max="1000"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
          />

        </StyledSelectColumn>
      </StyledSelectRow>

      <StyledSelectRow>
        <StyledSelectColumn>
          <Label htmlFor="description">description</Label>
          <StyledTextArea id="description" rows="6" cols="30" value={description} onChange={(e) => setDescription(e.target.value)} />
        </StyledSelectColumn>
      </StyledSelectRow>

      <StyledSelectRow>
        <StyledInactiveButton onClick={closeAdd} type="button">Close</StyledInactiveButton>
        <StyledPrimaryButton type="submit">
          {isLoading
            ? <Spinner />
            : 'Add'}
        </StyledPrimaryButton>
      </StyledSelectRow>

    </StyledForm>
  );
};

AddTrip.propTypes = {
  closeAdd: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  loggedInUser: UserPayload.isRequired,
  theme: ThemeShape.isRequired,
};

export default withTheme(AddTrip);
