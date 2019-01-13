import React from 'react';
import TvShowSearchContainer from '../../containers/TvShowSearchContainer';
import NavigationItem from './NavigationItem';
import styles from './NavigationBar.css';

const NavigationBar = () => (
  <div className={styles.root}>
    <div className={styles.logo}>
      Air schedule
    </div>

    <div className={styles.content}>
      <NavigationItem label="Schedule" to="/schedule" />
      <NavigationItem label="Search" to="/search" />
      <div className={styles.search}>
        <TvShowSearchContainer />
      </div>
    </div>
  </div>
);

export default NavigationBar;
