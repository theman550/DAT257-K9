import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TripCard from '../../components/Trip/Card/Card';
import config from '../../config';

const sampleTrips = [
  {
    tripID: 0,
    startLocation: 'Göteborg',
    destination: 'Malmö',
    driver: {
      firstName: 'David',
      lastName: 'Hernandez',
      // avatarUrl: 'https://vip.nypost.com/wp-content/uploads/sites/2/2015/01/clark1.jpg',
    },
    startTime: new Date(),
    seatsAvailable: 1,
  },
  {
    tripID: 1,
    startLocation: 'Göteborg',
    destination: 'Stockholm',
    driver: {
      firstName: 'David',
      lastName: 'Hernandez',
      // avatarUrl: 'https://vip.nypost.com/wp-content/uploads/sites/2/2015/01/clark1.jpg',
    },
    startTime: new Date(),
    seatsAvailable: 1,
  },
];

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 1rem;
    margin-bottom: 5rem;
    background-color: ${(props) => props.theme.colors.fill};

    // Set each card to have a width of 500px
    & > * {
        width: 500px;
    }

    // Let every card have a margin beneath itself as long as it's not the last card
    & > *:not(:last-child) {
        margin-bottom: 2rem;
    }

    // Whenever the viewport decreases to about 640px(1em is usually 16px depending on the device, zoom, etc)
    // make the cards take up the entire width
    @media only screen and (max-width: 40em) {
        padding: 0;

        & > * {
            border-radius: 0px;
            width: 100%;
        }
    }
`;

const ScreensDisplay = ({ filteredTrips }) => {
  const [trips, setTrips] = useState([]);

  const getTrips = async () => {
    if (filteredTrips.length > 0) {
      setTrips(filteredTrips);
      return;
    }

    try {
      const res = await fetch(`${config.api.url}trips/`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.data || data.message || 'No error message provided');
      }

      // Adding driver property until API resource is implemented
      // Converting date string to Date object
      setTrips(
        data
          .map((trip) => ({
            ...trip,
            driver: sampleTrips[0].driver,
            startTime: new Date(trip.startTime),
            seatsAvailable: Number.parseInt(trip.seatsAvailable, 10),
            price: Number.parseInt(trip.price, 10),
          })),
      );
    } catch (error) {
      console.warn('Could not retrieve trips', error.message);
    }
  };

  // Same functionality as componentDidMount, only runs on the first render
  useEffect(() => { getTrips(); }, [filteredTrips]); // eslint-disable-line

  return (
    <Wrapper>
      {trips.map((trip) => (
        <TripCard
          key={trip.tripID}
          id={trip.tripID}
          origin={trip.startLocation}
          destination={trip.destination}
          driver={trip.driver}
          datetime={trip.startTime}
          seats={trip.seatsAvailable}
        />
      ))}
    </Wrapper>
  );
};

ScreensDisplay.propTypes = {
  filteredTrips: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ScreensDisplay;
