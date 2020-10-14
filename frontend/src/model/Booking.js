import PropTypes from 'prop-types';

export default {
  userID: PropTypes.string.isRequired,
  tripID: PropTypes.string.isRequired,
};

// toBookingEntity is a utility function that recognizes differences between
// API data model and frontend's data model and converts from API
// to frontend
const toBookingEntity = (bookingResponse) => ({
  ...bookingResponse,
});

export { toBookingEntity };
