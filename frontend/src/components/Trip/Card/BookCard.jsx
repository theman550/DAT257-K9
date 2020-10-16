import React, { useState } from 'react';
import styled, { withTheme } from 'styled-components';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import TripCard from './Card';
import TripModel from '../../../model/Trip';
import {
  PrimaryButton,
  Label,
  FieldFactory,
} from '../../UI';
import UserPayload from '../../../model/UserPayload';
import ThemeShape from '../../../model/ThemeShape';
import config from '../../../config';
import Spinner from '../../Spinner';

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

const BookCard = ({
  trip,
  showNotification,
  loggedInUser,
  theme,
}) => {
  const [seats, setSeats] = useState(trip.seatsAvailable);
  const [isLoading, setIsLoading] = useState(false);

  const submitBooking = async (tripID, numberOfSeats) => {
    console.log(`Submitting booking for trip of id: ${tripID} with ${numberOfSeats} seats`);
    setIsLoading(true);

    try {
      const res = await fetch(`${config.api.url}booking/`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tripID,
          seats: numberOfSeats,
          loggedInEmail: loggedInUser.email,
          token: loggedInUser.token,
        }),
      });

      const data = await res.json();

      try {
        if (!res.ok) {
          throw new Error(data.data || data.message || 'No error message provided');
        }
      } catch (error) {
        setIsLoading(false);
        return showNotification(error.message, theme.colors.error, 5);
      }
    } catch (error) {
      setIsLoading(false);
      return showNotification('Could not submit booking', theme.colors.error, 5);
    }

    setIsLoading(false);
    console.log('Successful booking!');
    // Decrease card's seats with numberOfSeats
    return setSeats(seats - numberOfSeats);
  };

  return (
    <TripCard
      trip={{ ...trip, seatsAvailable: seats, driver: { firstName: 'David', lastName: 'Hernandez' } }}
      controlFactory={({ tripID, seatsAvailable }) => (
        <Formik
          initialValues={{ seats: 1 }}
          onSubmit={(values) => submitBooking(tripID, values.seats)}
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
                    validate={(value) => ((value >= 1 && value <= seatsAvailable) ? '' : 'Error')}
                    className={errors.seats ? 'field-error' : null}
                  />
                </Label>
              </FieldContainer>
              <PrimaryButton type="submit">
                {isLoading
                  ? <Spinner />
                  : `Book ${values.seats} ${(values.seats > 1) ? 'seats' : 'seat'}`}
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
  showNotification: PropTypes.func.isRequired,
  loggedInUser: UserPayload.isRequired,
  theme: ThemeShape.isRequired,
};

export default withTheme(BookCard);
