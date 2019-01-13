import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'shared/components/Modal';
import Show from '../Show';

const ShowModal = ({ onClose, showId }) => (
  <Modal onClose={onClose} opened={!!showId}>
    {() => (
      <Show id={showId} />
    )}
  </Modal>
);

ShowModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  showId: PropTypes.string,
};

export default ShowModal;
