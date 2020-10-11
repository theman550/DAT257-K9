import React from 'react';
import PropTypes from 'prop-types';
import TripCard from './Card';
import TripModel from '../../../model/Trip';

// A card with no actions associated, just presentational
const PresentationalCard = ({ trip }) => (
  <TripCard
    trip={trip}
    controlFactory={() => (null)}
  />
);

PresentationalCard.propTypes = {
  trip: PropTypes.shape(TripModel).isRequired,
};

export default PresentationalCard;
