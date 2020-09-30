import React, { useState } from 'react';
import Modal, { ModalProvider } from 'styled-react-modal';
import SearchTrip from '../components/trips/SearchTrips';
import FloatingButtons from '../components/trips/FloatingButtons';
import AddTrip from '../components/trips/AddTrip';

const Trips = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
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
        <AddTrip closeAdd={() => setIsAddOpen(false)} />
      </Modal>
      <FloatingButtons
        openSearch={() => setIsSearchOpen(true)}
        openAdd={() => setIsAddOpen(true)}
      />
    </ModalProvider>
  );
};

export default Trips;
