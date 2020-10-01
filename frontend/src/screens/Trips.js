import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal, { ModalProvider } from 'styled-react-modal';
import SearchTrip from '../components/trips/SearchTrips';
import FloatingButtons from '../components/trips/FloatingButtons';
import DisplayScreen from './Trip/Display';
import AddTrip from '../components/trips/AddTrip';

const Trips = ({ showNotification }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <div>
      <DisplayScreen />
      <ModalProvider>
        <Modal
          isOpen={isSearchOpen}
          onBackgroundClick={() => setIsSearchOpen(false)}
          onEscapeKeydown={() => setIsSearchOpen(false)}
        >
          <SearchTrip closeSearch={() => setIsSearchOpen(false)} />
        </Modal>
        <Modal
          isOpen={isAddOpen}
          onBackgroundClick={() => setIsAddOpen(false)}
          onEscapeKeydown={() => setIsAddOpen(false)}
        >
          <AddTrip closeAdd={() => setIsAddOpen(false)} showNotification={showNotification} />
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
