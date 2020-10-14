import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import DisplayScreen from './Trip/Display';
import CancelCard from '../components/Trip/Card/CancelCard';
import config from '../config';
// Comment out once backend resources works
// eslint-disable-next-line no-unused-vars
import { toTripEntity } from '../model/Trip';
import { toBookingEntity } from '../model/Booking';
// Remove once backend resources works
// eslint-disable-next-line no-unused-vars
import { MockedBookings, MockedTrips } from '../mocks';
import {
  P,
  H2,
  H3,
  H4,
} from '../components/UI/Typography';
import UserPayload from '../model/UserPayload';
import ThemeShape from '../model/ThemeShape';

const Wrapper = styled.div`
  display: flex;

  padding: ${(props) => props.theme.padding.section};
  // Remove padding-bottom to allow the trip container to take up the entire page height
  padding-bottom: 0;

  & > *:not(:last-child) {
    margin-bottom: ${(props) => props.theme.spacing.section};
  }

  // Whenever the viewport decreases to about 640px, remove the wrapper padding to support full card width
  @media only screen and (max-width: 40em) {
    padding-left: 0;
    padding-right: 0;
  }

  // Once the screen gets smaller than around 1120px layout the header and trips vertically
  @media only screen and (max-width: 70em) {
    flex-direction: column;
    // Center horizontally
    align-items: center;
  }
`;

const Header = styled.div`
  width: 50%;
  height: fit-content;

  display: flex;
  flex-direction: column;
  align-items: flex-end;

  padding: ${(props) => props.theme.padding.section};
  // Push the header down 65px so it's at the same height as the trips
  margin-top: 65px;

  & > * {
    // Let header's children, take up half of its parent's width
    width: 60%;

    background-color: rgba(0, 0, 0, 0.7);
    border-radius: ${(props) => props.theme.size.corner};
    padding: ${(props) => props.theme.padding.section};
  }

  & > *:not(:last-child) {
    margin-bottom: ${(props) => props.theme.spacing.subsection};
  }

  // Once the screen gets smaller than around 1120px the header and trips are placed vertically
  // Center header horizontally at that point
  @media only screen and (max-width: 70em) {
    align-items: center;

    & > * {
      width: 100%;
    }
  }

  // Whenever the viewport decreases to about 640px, expand the header width to make its content readable
  @media only screen and (max-width: 40em) {
    width: 90%;
  }
`;

const AvatarContent = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  & > ${P} {
    // font-size: 2vw;
    font-size: 1.5em;
  }
`;

const AvatarContainer = styled.div`
  // Force the avatar container to be squared with a workaround using percentage width
  width: 15%;
  position: relative;

  border-radius: 50%;
  box-sizing: content-box;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  // Apply primary to secondary gradient to background property
  background: ${(props) => props.theme.colors.gradient};

  &:after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }

  ${AvatarContent} {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  & > * {
      font-size: 0.8em;
  }
`;

const UserTrips = styled.div`
  // The intent with 100vh - (navbar size) - 1rem is to let
  // the list of cards container to take up the entire height within
  // the page and let its contents to be scrolled through
  // Must subtract by 1rem as well because of wrapper's padding-top
  height: calc(100vh - ${(props) => props.theme.size.navbar} - 1rem);
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding: ${(props) => props.theme.padding.section};
  // Make trips their own scrollable container
  overflow-y: scroll;

  // Whenever the viewport decreases to about 640px, expand container's width and
  // remove the container's padding to support full card width
  @media only screen and (max-width: 40em) {
    width: 100%;
    padding-left: 0;
    padding-right: 0;

    & > * {
      width: 100%;
    }
  }

  // Once the screen gets smaller than around 1120px the header and trips are placed vertically
  // therefore disable trip container scrolling through removing the height and overflow properties
  @media only screen and (max-width: 70em) {
    height: auto;
    overflow-y: auto;
  }
`;

const TripContainer = styled.div`
  display: flex;
  flex-direction: column;

  .trip-header {
    height: 50px;
    padding: ${(props) => props.theme.padding.section};

    display: flex;
    justify-content: center;
    align-items: flex-end;

    // Once the screen gets smaller than around 1120px the trip container header is
    // positioned to the top left as to center
    @media only screen and (max-width: 70em) {
      justify-content: flex-start;
    }
  }
`;

const UserInformation = styled.div`
  .details {
    display: flex;
  }

  .details > *:nth-child(even):not(:last-child) {
    margin-right: ${(props) => props.theme.spacing.subsection};
  }

  .details > *:nth-child(odd) {
    margin-right: ${(props) => props.theme.spacing.hNeighbor};
  }
`;

const UserStatistics = styled.div`
  display: flex;
  justify-content: space-evenly;

  & > *:not(:first-child) {
    margin-left: ${(props) => props.theme.spacing.subsection};
  }

  & > *:not(:last-child) {
    margin-right: ${(props) => props.theme.spacing.subsection};
  }
`;

const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > *:not(:last-child) {
    margin-bottom: ${(props) => props.theme.spacing.subsection};
  }
`;

const Account = ({ showNotification, theme, loggedInUser }) => {
  const [userData, setUserData] = useState(null);
  const [bookedTrips, setBookedTrips] = useState([]);

  const getUserData = async () => {
    console.log('Retrieving user');
    try {
      const res = await fetch(`${config.api.url}users/?email=${loggedInUser.email}`, { mode: 'cors' });
      const data = await res.json();

      // Apply response validations, if any error is caught, log the error directly
      // The error is expected not to contain any important information since
      // it was either thrown here or by the API
      try {
        if (!res.ok) {
          throw new Error(data.data || data.message || 'No error message provided');
        }

        if (data.length === 0) {
          throw new Error('No user with that email');
        }

        if (data.length > 1) {
          throw new Error('More than one user with the same email');
        }
      } catch (error) {
        showNotification(error.message, theme.colors.error, 5);
      }

      setUserData(data[0]);
    } catch (error) {
      showNotification('Could not retrieve user', theme.colors.error, 5);
    }
  };

  const getTrip = async (tripID) => {
    console.log(`Retrieving trip with id: ${tripID}`);
    let user;

    try {
      const res = await fetch(`${config.api.url}trips/${tripID}/`, { mode: 'cors' });
      const data = await res.json();

      try {
        if (!res.ok) {
          throw new Error(data.data || data.message || 'No error message provided');
        }
      } catch (error) {
        showNotification(error.message, theme.colors.error, 5);
      }

      user = data;
    } catch (error) {
      showNotification('Could not retrieve trip associated with booking', theme.colors.error, 5);
    }

    return user;
  };

  /**
   * (1) Retrieve user's bookings based on the user's id.
   * (2) Retrieve each booking's related trip.
   * (3) Combine models by placing bookings as a child property of the trip.
   */
  const getBookedTrips = async () => {
    console.log('Retrieving bookings');

    try {
      if (userData === null) {
        throw new Error('Cannot retrieved booked trips, could not find user');
      }

      const res = await fetch(`${config.api.url}bookings/?userID=${userData.userID}`, { mode: 'cors' });
      const data = await res.json();

      try {
        if (!res.ok) {
          throw new Error(data.data || data.message || 'No error message provided');
        }
      } catch (error) {
        showNotification(error.message, theme.colors.error, 5);
      }

      const associatedTrips = data
        .map((b) => toBookingEntity(b))
        .reduce(async (acc, booking) => {
          const trip = await getTrip(booking.tripID);

          // For each iteration adds a new entry with the key of the related trip's id
          // Where value is the trip properties along with a new property, "booking",
          // that is the user's booking. I'm assuming a user can only place one booking
          return {
            ...acc,
            [booking.tripID]: {
              ...trip,
              booking,
            },
          };
        }, {});

      setBookedTrips(associatedTrips);
    } catch (error) {
      showNotification('Could not retrieve bookings', theme.colors.error, 5);
    }
  };

  // Runs after the first component render
  useEffect(() => {
    getBookedTrips();
    getUserData();

    /* setBookedTrips(
      MockedBookings
        .map((booking) => MockedTrips.find((t) => t.tripID === booking.tripID)),
    );
    setUserData({ firstName: 'David', lastName: 'Hernandez' }); */
  }, []);

  return (
    <Wrapper>
      <Header>
        <UserProfile>
          <AvatarContainer>
            <AvatarContent>
              <P>
                { userData && userData.firstName && userData.firstName.slice(0, 1) }
                { userData && userData.lastName && userData.lastName.slice(0, 1) }
              </P>
            </AvatarContent>
          </AvatarContainer>
          <UserInformation>
            <H3>
              {userData && userData.firstName}
              {' '}
              {userData && userData.lastName}
            </H3>
          </UserInformation>
        </UserProfile>

        <UserStatistics>
          <div>
            <H4>Trips taken</H4>
            <H3>147</H3>
          </div>
          <div>
            <H4>Trips shared</H4>
            <H3>7</H3>
          </div>
          <div>
            <H4>CO2 emissions prevented</H4>
            <H3>15 kg</H3>
          </div>
        </UserStatistics>
      </Header>
      <UserTrips>
        <TripContainer>
          <div className="trip-header">
            <H2>My booked trips</H2>
          </div>
          <DisplayScreen
            trips={bookedTrips}
            tripComponent={(trip) => (
              <CancelCard
                key={trip.tripID}
                trip={trip}
                showNotification={showNotification}
              />
            )}
          />
        </TripContainer>
      </UserTrips>
    </Wrapper>
  );
};

Account.propTypes = {
  showNotification: PropTypes.func.isRequired,
  loggedInUser: UserPayload.isRequired,
  theme: ThemeShape.isRequired,
};

export default withTheme(Account);
