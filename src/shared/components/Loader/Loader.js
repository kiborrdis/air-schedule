import React from 'react';
import { Spinner } from '@blueprintjs/core';
import styles from './Loader.css';

const Loader = () => (
  <div className={styles.root}>
    <Spinner />
  </div>
);

export default Loader;
