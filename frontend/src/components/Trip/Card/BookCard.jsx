import React from 'react';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import TripCard from './Card';
import TripModel from '../../../model/Trip';
import {
  PrimaryButton,
  Label,
  FieldFactory,
} from '../../UI';

const StyledForm = styled(Form)`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;

    & > *:not(:last-child) {
        margin-right: ${(props) => props.theme.spacing.subsection};
    }

    & > ${PrimaryButton} {
        // appearance: none;
        height: 80%;
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
    }
`;

const SeatsField = styled(FieldFactory(Field))`
    // Make width to about 6 characters width
    width: 6ch;
`;

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;

    & > label {
        display: block;

        & > * {
            display: block;
        }
    }
`;

const submitBooking = async (id, numberOfSeats) => {
  console.log(`Submitting booking for trip of id: ${id} with ${numberOfSeats} seats`);

  try {
    // Add some type of global message service that can display notifications
    const res = await fetch('http://splig.xyz/api/trips', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        seats: numberOfSeats,
        // Eventually add userId
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.data || data.message || 'No error message provided');
    }

    console.log('Successful booking!');
  } catch (error) {
    console.warn('Could not submit booking', error.message);
  }
};

const BookCard = ({ trip }) => {
  console.log('BookCard', trip);

  return (
    <TripCard
      trip={{ ...trip, driver: { firstName: 'David', lastName: 'Hernandez' } }}
      controlFactory={({ id, maxSeats }) => (
        <Formik
          initialValues={{ seats: 1 }}
          onSubmit={(values) => submitBooking(id, values.seats)}
        >
          {({ values, errors }) => (
            <StyledForm>
              <FieldContainer>
                <Label htmlFor="seats">
                  seats
                  <SeatsField
                    id="seats"
                    name="seats"
                    type="number"
                    placeholder="1"
                    validate={(value) => ((value >= 1 && value <= maxSeats) ? '' : 'Error')}
                    className={errors.seats ? 'field-error' : null}
                  />
                </Label>
              </FieldContainer>
              <PrimaryButton type="submit">
                Book
                {' '}
                {values.seats}
                {' '}
                {(values.seats > 1) ? 'seats' : 'seat'}
              </PrimaryButton>
            </StyledForm>
          )}
        </Formik>
      )}
    />
  );
};

BookCard.propTypes = {
  trip: PropTypes.shape(TripModel).isRequired,
};

export default BookCard;
