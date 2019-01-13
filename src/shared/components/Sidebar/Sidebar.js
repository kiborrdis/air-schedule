import React from 'react';
import PropTypes from 'prop-types';
import styles from './Sidebar.css';

const Sidebar = ({ children, title }) => (
  <div className={styles.root}>
    <div className={styles.title}>
      {title}
    </div>
    <div className={styles.content}>
      {children}
    </div>
  </div>
);

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default Sidebar;
