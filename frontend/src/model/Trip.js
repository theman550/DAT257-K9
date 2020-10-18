import PropTypes from 'prop-types';

export default {
  tripID: PropTypes.string.isRequired,
  userID: PropTypes.string.isRequired,
  startLocation: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
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
  seatsAvailable: Number.parseInt(tripResponse.seatsAvailable, 10),
  price: Number.parseInt(tripResponse.price, 10),
});

const toResourceDateFormat = (datetime) => {
  // toISOString returns a datetime format such as '2011-10-05T14:48:00.000Z'
  // date = YYYY-MM-DD
  // time = HH:mm:ss.sssZ
  const [date, time] = datetime.toISOString().split('T');

  // Remove time's milliseconds, seconds will suffice
  return `${date} ${time.split('.')[0]}`;
};

// Converts from frontend's entity to API's resource properties
const toTripResource = (tripEntity) => ({
  ...tripEntity,
  startTime: toResourceDateFormat(tripEntity.startTime),
});

export { toTripEntity, toTripResource };
