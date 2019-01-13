import React from 'react';
import PropTypes from 'prop-types';
import { NonIdealState as BlueprintNonIdealState } from '@blueprintjs/core';
import styles from './NonIdealState.css';

const NonIdealState = ({ title, description }) => (
  <BlueprintNonIdealState className={styles.root} title={title} description={description} />
);

NonIdealState.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default NonIdealState;
