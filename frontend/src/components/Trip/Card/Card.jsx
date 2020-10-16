import React from 'react';
import styled from 'styled-components';
import { Star, Key } from 'react-feather';
import PropTypes from 'prop-types';
import TripModel from '../../../model/Trip';
import {
  Card,
  H2,
  H3,
  H4,
  P,
} from '../../UI';

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
    
    // If there are controls below trip details, display margin
    &:not(:last-child) {
      margin-bottom: ${(props) => props.theme.spacing.subsection};
    }

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

const TripCard = ({
  controlFactory,
  trip: {
    tripID,
    startLocation,
    destination,
    driver,
    startTime,
    seatsAvailable,
  },
}) => (
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
            {startLocation}
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
              {startTime.toLocaleString([], {
                hour: 'numeric',
                minute: 'numeric',
                month: 'numeric',
                day: 'numeric',
              })}
            </H3>
          </div>
          <div>
            <H4>With seats</H4>
            <H3>{seatsAvailable}</H3>
          </div>
        </TripDetails>

        {controlFactory({
          tripID, startLocation, destination, driver, startTime, seatsAvailable,
        })}
      </CardBody>
        )}
  />
);

TripCard.propTypes = {
  // controlFactory takes in a trip and generates specific controls
  // for each card. This means you can send requests with card
  // details on a control's click
  controlFactory: PropTypes.func.isRequired,
  trip: PropTypes.shape(TripModel).isRequired,
};

export default TripCard;
