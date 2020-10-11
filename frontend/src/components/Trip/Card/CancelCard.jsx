import React from 'react';
import { Formik, Form } from 'formik';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import TripCard from './Card';
import TripModel from '../../../model/Trip';
import { InactiveButton } from '../../UI';

const StyledForm = styled(Form)`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;

    & > *:not(:last-child) {
        margin-right: ${(props) => props.theme.spacing.subsection};
    }

    & > ${InactiveButton} {
        // appearance: none;
        height: 80%;
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
    }
`;

const CancelCard = ({ trip }) => {
  const cancelBooking = (id, seats) => {
    console.log(`Cancelling booking with id: ${id} for ${seats} seats`);
  };

  return (
    <TripCard
      trip={trip}
      controlFactory={({ tripID }) => (
        <Formik
          initialValues={{ seats: 1 }}
          onSubmit={(values) => cancelBooking(tripID, values.seats)}
        >
          {() => (
            <StyledForm>
              <InactiveButton type="submit">Cancel booking</InactiveButton>
            </StyledForm>
          )}
        </Formik>
      )}
    />
  );
};

CancelCard.propTypes = {
  trip: PropTypes.shape(TripModel).isRequired,
};

export default CancelCard;
