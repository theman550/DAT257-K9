import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Star, Key } from 'react-feather';
import PropTypes from 'prop-types';
import TripModel from '../../../model/Trip';
import config from '../../../config';
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
    userID,
    startLocation,
    destination,
    driver,
    startTime,
    seatsAvailable,
  },
}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getTripUser = async () => {
      try {
        const res = await fetch(`${config.api.url}users/?userID=${userID}`, { mode: 'cors' });
        const data = await res.json();

        // If there are less or more than 1 user, throw an error
        if (data.length !== 1) {
          throw new Error('Could not find a specific user related to trip');
        }

        setUser(data[0]);
      } catch (error) {
        // With user set to null, user data will be replaced with ----
        setUser(null);
      }
    };

    getTripUser();
  }, [userID]);

  return (
    <Card
      headerContent={(
        <CardHeader>
          <Driver>
            <div className="details">
              <Star color="white" size="16" />
              <H3>---</H3>
              <Key color="white" size="16" />
              <H3>----------</H3>
            </div>
            <H3>
              {user ? user.firstname : '----'}
              {' '}
              {user ? user.lastname : '----'}
            </H3>
          </Driver>

          <AvatarContainer>
            <P>
              {user ? user.firstname.slice(0, 1) : '-'}
              {user ? user.lastname.slice(0, 1) : '-'}
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
};

TripCard.propTypes = {
  // controlFactory takes in a trip and generates specific controls
  // for each card. This means you can send requests with card
  // details on a control's click
  controlFactory: PropTypes.func.isRequired,
  trip: PropTypes.shape(TripModel).isRequired,
};

export default TripCard;
