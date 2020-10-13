import React, { useState } from 'react';
import styled from 'styled-components';
import { Star, Key } from 'react-feather';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import {
  Card,
  PrimaryButton,
  Label,
  H2,
  H3,
  H4,
  P,
  FieldFactory,
} from '../../UI';
import Spinner from '../../Spinner';

const CardHeader = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    // Re-apply padding since 'position: absolute' neglects padding
    box-sizing: content-box;
    padding: ${(props) => props.theme.padding.section};
`;

const Driver = styled.div`
    display: flex;
    flex-direction: column;

    .details {
        display: flex;
        margin-bottom: ${(props) => props.theme.spacing.vNeighbor};
    }

    .details > h3 {
        font-size: 0.8em;
    }

    .details > :not(h3) {
        margin-right: ${(props) => props.theme.spacing.hNeighbor};
    }

    .details > h3:not(:last-child) {
        margin-right: 1rem;
    }
`;

const CardBody = styled.div`
    display: flex;
    flex-direction: column;
`;

const TripDetails = styled.div`
    display: flex;
    margin-bottom: ${(props) => props.theme.spacing.subsection};

    & > div:not(:last-child) {
        margin-right: 4rem;
    }
`;

const AvatarContainer = styled.div`
    background-color: #1a1a1a;
    border-radius: 50%;
    box-sizing: content-box;
    padding: 0.5rem;
    width: 15px;
    height: 15px;
    display: flex;
    justify-content: center;
    align-items: center;

    & > * {
        font-size: 0.8em;
    }
`;

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
    // Make width to about 4 characters width
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

const TripCard = ({
  id,
  origin,
  destination,
  driver,
  datetime,
  seats: maxSeats,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const submitBooking = async (tripId, numberOfSeats) => {
    setIsLoading(true);

    try {
      // TODO: Add some type of global message service that can display notifications
      const res = await fetch('http://splig.xyz/api/trips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: tripId,
          seats: numberOfSeats,
          // TODO: Eventually add userId
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

    setIsLoading(false);
  };

  return (
    <Card
      headerContent={(
        <CardHeader>
          <Driver>
            <div className="details">
              <Star color="white" size="16" />
              <H3>4.76</H3>
              <Key color="white" size="16" />
              <H3>87&apos; Volkswagen</H3>
            </div>
            <H3>
              {driver.firstName}
              {' '}
              {driver.lastName}
            </H3>
          </Driver>

          <AvatarContainer>
            <P>
              {driver.firstName.slice(0, 1)}
              {driver.lastName.slice(0, 1)}
            </P>
          </AvatarContainer>
        </CardHeader>
          )}
      bodyContent={(
        <CardBody>
          <H2>
            <span>
              {origin}
              {' '}
              -
              {' '}
            </span>
            <span>{destination}</span>
          </H2>

          <TripDetails>
            <div>
              <H4>Departs at</H4>
              <H3>
                {datetime.toLocaleString([], {
                  hour: 'numeric',
                  minute: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                })}
              </H3>
            </div>
            <div>
              <H4>With seats</H4>
              <H3>{maxSeats}</H3>
            </div>
          </TripDetails>

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
                  {isLoading
                    ? <Spinner />
                    : `Book ${values.seats} seats`}
                </PrimaryButton>
              </StyledForm>
            )}
          </Formik>
        </CardBody>
          )}
    />
  );
};

TripCard.propTypes = {
  id: PropTypes.string.isRequired,
  origin: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  driver: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }).isRequired,
  datetime: PropTypes.instanceOf(Date).isRequired,
  seats: PropTypes.number.isRequired,
};

export default TripCard;
