import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal, { ModalProvider } from 'styled-react-modal';
import config from '../config';
import SearchTrip from '../components/trips/SearchTrips';
import FloatingButtons from '../components/trips/FloatingButtons';
import DisplayScreen from './Trip/Display';
import AddTrip from '../components/trips/AddTrip';
import Pagination from '../components/trips/Pagination';
import BookCard from '../components/Trip/Card/BookCard';
import UserPayload from '../model/UserPayload';

const Trips = ({ showNotification, loggedInUser }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [page, setPage] = useState(1);
  const tripsPerPage = 10;

  const getTrips = async (query) => {
    console.log('Retrieving trips');
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
  };

  const pageHandler = (pageNumber) => {
    setPage(pageNumber);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getTrips('');
  }, []); // eslint-disable-line

  /*
  <DisplayScreen
        trips={filteredTrips.length > 0 ? filteredTrips.slice(
          (page - 1) * tripsPerPage,
          (page - 1) * tripsPerPage + tripsPerPage,
        ) : []}
      />
  */
  return (
    <div>
      {console.log('filteredTrips', filteredTrips)}
      <DisplayScreen
        trips={filteredTrips}
        tripComponent={(trip) => <BookCard trip={trip} />}
      />
      <ModalProvider>
        <Modal
          isOpen={isSearchOpen}
          onBackgroundClick={() => setIsSearchOpen(false)}
          onEscapeKeydown={() => setIsSearchOpen(false)}
        >
          <SearchTrip
            closeSearch={() => setIsSearchOpen(false)}
            getTrips={getTrips}
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
            loggedInUser={loggedInUser}
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
  loggedInUser: UserPayload.isRequired,
};

export default Trips;
