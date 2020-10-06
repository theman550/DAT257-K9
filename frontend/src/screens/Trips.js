import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal, { ModalProvider } from 'styled-react-modal';
import config from '../config';
import SearchTrip from '../components/trips/SearchTrips';
import FloatingButtons from '../components/trips/FloatingButtons';
import DisplayScreen from './Trip/Display';
import AddTrip from '../components/trips/AddTrip';

const Trips = ({ showNotification }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [filteredTrips, setFilteredTrips] = useState([]);

  const getTrips = async (query) => {
    try {
      const res = await fetch(`${config.api.url}trips/${query}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.data || data.message || 'No error message provided');
      }

      if (data === 'no results found') {
        showNotification('No results found', 'red', 3);
        setFilteredTrips([]);
        return;
      }

      setFilteredTrips(
        data
          .map((trip) => ({
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

  useEffect(() => {
    getTrips('');
  }, []);

  return (
    <div>
      <DisplayScreen trips={filteredTrips} />
      <ModalProvider>
        <Modal
          isOpen={isSearchOpen}
          onBackgroundClick={() => setIsSearchOpen(false)}
          onEscapeKeydown={() => setIsSearchOpen(false)}
        >
          <SearchTrip
            closeSearch={() => setIsSearchOpen(false)}
            getTrips={getTrips}
            showNotification={showNotification}
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
        <FloatingButtons
          openSearch={() => setIsSearchOpen(true)}
          openAdd={() => setIsAddOpen(true)}
        />
      </ModalProvider>
    </div>
  );
};

Trips.propTypes = {
  showNotification: PropTypes.func.isRequired,
};

export default Trips;
