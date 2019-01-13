import React from 'react';
import PropTypes from 'prop-types';
import styles from './DefaultContentLayout.css';

const DefaultContentLayout = ({ children, panel }) => (
  <div className={styles.root}>
    <div className={styles.panel}>
      {panel}
    </div>
    <div className={styles.panelPlaceholder} />
    <div className={styles.content}>
      {children}
    </div>
  </div>
);

DefaultContentLayout.propTypes = {
  children: PropTypes.node.isRequired,
  panel: PropTypes.node,
};

export default DefaultContentLayout;
