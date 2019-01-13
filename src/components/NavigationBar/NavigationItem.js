import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './NavigationItem.css';

const NavigationItem = ({ label, to }) => (
  <NavLink activeClassName={styles.active} to={to}>
    <div className={styles.link}>
      {label}
    </div>
  </NavLink>
);

NavigationItem.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default NavigationItem;
