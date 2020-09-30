/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { Formik, Field } from 'formik';
import {
  FieldFactory,
  PrimaryButton,
  Label,
} from '../UI';

const StyledInput = FieldFactory(Field);

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.fill};
  padding: 1rem;
  margin: 30% auto;
  margin-top:-1%;
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

const AddTrip = ({ closeAdd, showNotification }) => {
  const onSubmit = (values) => {
    const newvalues = {

      startLocation: values.startLocation,
      destination: values.destination,
      seatsAvailable: values.seatsAvailable,
      startTime: `${values.startTime} ${values.time}`,
      price: values.price,
      description: values.description,
    };
    // Test the data. we must remove it in final product.
    console.log(values);
    const jsdata = JSON.stringify(newvalues);
    console.log(jsdata);
    //--------------------------

    fetch('http://spilg.xyz/api/trips/', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newvalues),
    }).then((respones) => respones).then((data) => {
      console.log(data);
      if (data.status === 400) {
        showNotification('Sorry ! this is bad request , You should try agian with valid inputs ', '#CC354E', '5');
        console.log('Bad request');
      } else if (data.status === 201) {
        showNotification('Your trip is added succesfully :)', '#378C2E', '7');
      }
    });
  };

  const form = (props) => (
    <StyledForm aria-label="AddTrip form" onSubmit={props.handleSubmit}>
      <StyledTextRow>
        <Label htmlFor="from">From</Label>
        <StyledInput name="startLocation" type="text" id="from" placeholder="Enter start location..." />
      </StyledTextRow>
      <StyledTextRow>
        <Label htmlFor="to">To</Label>
        <StyledInput name="destination" type="text" id="to" placeholder="Enter destination..." />
      </StyledTextRow>
      <StyledSelectRow>
        <StyledSelectColumn>
          <Label htmlFor="date">Date</Label>
          <StyledInput name="startTime" type="date" id="date" />
        </StyledSelectColumn>
        <StyledSelectColumn>
          <Label htmlFor="time">Time</Label>
          <StyledInput name="time" type="time" />
        </StyledSelectColumn>
      </StyledSelectRow>
      <StyledSelectRow>
        <StyledSelectColumn>
          <Label htmlFor="seats">Seats</Label>
          <StyledInput name="seatsAvailable" type="number" id="seats" min="0" max="4" />
        </StyledSelectColumn>
        <StyledSelectColumn>
          <Label htmlFor="price">Price</Label>
          <StyledInput name="price" type="number" id="price" min="0" max="1000" />
        </StyledSelectColumn>
      </StyledSelectRow>
      <StyledSelectRow>
        <StyledSelectColumn>
          <Label htmlFor="description">description</Label>
          <StyledInput name="description" id="description" component="textarea" rows="6" cols="30" />
        </StyledSelectColumn>
      </StyledSelectRow>

      <StyledSelectRow>
        <StyledButton onClick={closeAdd} type="button">Close</StyledButton>
        <StyledButton type="submit">Add</StyledButton>
      </StyledSelectRow>
    </StyledForm>
  );

  return (
    <div className="SearchGui">
      <Formik
        data-testid="form"
        initialValues={{
          startLocation: '', destination: '', seatsAvailable: 1, startTime: '', time: '', price: 0, description: '',
        }}
        onSubmit={onSubmit}
      >
        {form}
      </Formik>
    </div>
  );
};

export default AddTrip;
