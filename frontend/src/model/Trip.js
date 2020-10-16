import PropTypes from 'prop-types';

export default {
  tripID: PropTypes.string.isRequired,
  userID: PropTypes.string.isRequired,
  startLocation: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  driver: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }).isRequired,
  startTime: PropTypes.instanceOf(Date).isRequired,
  seatsAvailable: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
};

// toTripEntity is a utility function that recognizes differences between
// API data model and frontend's data model and converts from API
// to frontend
const toTripEntity = (tripResponse) => ({
  ...tripResponse,
  // Convert datetime string to Date object
  startTime: new Date(tripResponse.startTime),
  // Add mock driver data
  driver: {
    firstName: 'David',
    lastName: 'Hernandez',
  },
  seatsAvailable: Number.parseInt(tripResponse.seatsAvailable, 10),
  price: Number.parseInt(tripResponse.price, 10),
});

export { toTripEntity };
