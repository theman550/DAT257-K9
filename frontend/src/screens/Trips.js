import React, { useState } from 'react';
import Modal, { ModalProvider } from 'styled-react-modal';
import SearchTrip from '../components/trips/SearchTrips';
import FloatingButtons from '../components/trips/FloatingButtons';
import DisplayScreen from './Trip/Display';

const Trips = () => {
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

export default Trips;
