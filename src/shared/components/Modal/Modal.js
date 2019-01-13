import React from 'react';
import PropTypes from 'prop-types';
import { Overlay } from '@blueprintjs/core';
import styles from './Modal.css';

const Modal = ({ onClose, opened, children }) => (
  <Overlay isOpen={opened} onClose={onClose} transitionDuration={0}>
    <div className={styles.root}>
      <div className={styles.content}>
        {
          children instanceof Function ? children() : children
        }
      </div>
    </div>
  </Overlay>
);

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  opened: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

export default Modal;
