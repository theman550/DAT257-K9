import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal, { ModalProvider } from 'styled-react-modal';
import styled from 'styled-components';
import { Loader } from 'react-feather';
import config from '../config';
import SearchTrip from '../components/trips/SearchTrips';
import FloatingButtons from '../components/trips/FloatingButtons';
import DisplayScreen from './Trip/Display';
import AddTrip from '../components/trips/AddTrip';
import Pagination from '../components/trips/Pagination';

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spinner = styled(Loader)`
  width: 10%;
  height: 10%;
  color: ${(props) => props.theme.colors.inactive};
  animation-name: spin;
  animation-duration: 5000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  @keyframes spin {
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
  }
`

const Trips = ({ showNotification }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const tripsPerPage = 10;

  const getTrips = async (query) => {
    setIsLoading(true);

    try {
      const res = await fetch(`${config.api.url}trips/${query}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.data || data.message || 'No error message provided',
        );
      }

      if (data === 'no results found') {
        showNotification('No results found', 'red', 3);
        setFilteredTrips([]);
        return;
      }

      setFilteredTrips(
        data.map((trip) => ({
          ...trip,
          // mocking the driver
          driver: {
            firstName: 'John',
            lastName: 'Doe',
          },
          startTime: new Date(trip.startTime),
          seatsAvailable: Number.parseInt(trip.seatsAvailable, 10),
          price: Number.parseInt(trip.price, 10),
        })),
      );
    } catch (error) {
      showNotification('Could not retrieve trips', 'red', 3);
      console.error(error.message);
      setFilteredTrips([]);
    }

    setIsLoading(false);
  };

  const pageHandler = (pageNumber) => {
    setPage(pageNumber);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getTrips('');
  }, []); // eslint-disable-line

  return (
    <div>
      {isLoading ?
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
        :
        <DisplayScreen
          trips={filteredTrips.slice(
            (page - 1) * tripsPerPage,
            (page - 1) * tripsPerPage + tripsPerPage,
          )}
        />
      }
      <ModalProvider>
        <Modal
          isOpen={isSearchOpen}
          onBackgroundClick={() => setIsSearchOpen(false)}
          onEscapeKeydown={() => setIsSearchOpen(false)}
        >
          <SearchTrip
            closeSearch={() => setIsSearchOpen(false)}
            getTrips={getTrips}
            isLoading={isLoading}
          />
        </Modal>
        <Modal
          isOpen={isAddOpen}
          onBackgroundClick={() => setIsAddOpen(false)}
          onEscapeKeydown={() => setIsAddOpen(false)}
        >
          <AddTrip
            closeAdd={() => setIsAddOpen(false)}
            showNotification={showNotification}
          />
        </Modal>
      </ModalProvider>
      <Pagination
        numberOfPages={Math.ceil(filteredTrips.length / tripsPerPage)}
        page={page}
        setPage={pageHandler}
      />
      <FloatingButtons
        openSearch={() => setIsSearchOpen(true)}
        openAdd={() => setIsAddOpen(true)}
      />
    </div>
  );
};

Trips.propTypes = {
  showNotification: PropTypes.func.isRequired,
};

export default Trips;
