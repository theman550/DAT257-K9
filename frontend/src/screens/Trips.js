import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal, { ModalProvider } from 'styled-react-modal';
import SearchTrip from '../components/trips/SearchTrips';
import FloatingButtons from '../components/trips/FloatingButtons';
import DisplayScreen from './Trip/Display';

const Trips = ({ showNotification }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [filteredTrips, setFilteredTrips] = useState([]);

  return (
    <div>
      <DisplayScreen filteredTrips={filteredTrips} />
      <ModalProvider>
        <Modal
          isOpen={isSearchOpen}
          onBackgroundClick={() => setIsSearchOpen(false)}
          onEscapeKeydown={() => setIsSearchOpen(false)}
        >
          <SearchTrip
            closeSearch={() => setIsSearchOpen(false)}
            setFilteredTrips={setFilteredTrips}
            showNotification={showNotification}
          />
        </Modal>
        <Modal
          isOpen={isAddOpen}
          onBackgroundClick={() => setIsAddOpen(false)}
          onEscapeKeydown={() => setIsAddOpen(false)}
        >
          <p style={{ color: 'white' }}>TODO: Add component</p>
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
