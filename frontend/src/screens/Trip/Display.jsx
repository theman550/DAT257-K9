import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TripCard from '../../components/Trip/Card/Card';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 1rem;
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

const ScreensDisplay = ({ trips }) => {
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
  trips: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ScreensDisplay;
