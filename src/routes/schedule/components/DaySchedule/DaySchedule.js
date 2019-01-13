import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'shared/components/Grid';
import FormattedDate from 'shared/components/FormattedDate';
import Loader from 'shared/components/Loader';
import NonIdealState from 'shared/components/NonIdealState';
import styles from './DaySchedule.css';

const DayScheduleContent = ({
  loaded, data, thumbsUp, thumbsDown, onShowClick, date,
}) => {
  if (!loaded) {
    return <Loader />;
  }

  if (data.length === 0) {
    return (
      <NonIdealState
        title={`No shows matching current filter are to air at ${date}`}
      />
    );
  }

  return (
    <div className={styles.content}>
      <Grid data={data} sharedProps={{ thumbsUp, thumbsDown, onClick: onShowClick }} />
    </div>
  );
};

DayScheduleContent.propTypes = {
  date: PropTypes.string.isRequired,
  onShowClick: PropTypes.func.isRequired,
  thumbsUp: PropTypes.func.isRequired,
  thumbsDown: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape),
  loaded: PropTypes.bool.isRequired,
};

const DaySchedule = ({
  date, ...rest
}) => (
  <div className={styles.root}>
    <div className={styles.header}>
      <FormattedDate date={date} format="DD.MM.YYYY, dddd" calendar />
    </div>

    <DayScheduleContent
      date={date}
      {...rest}
    />
  </div>
);

DaySchedule.propTypes = {
  date: PropTypes.string.isRequired,
};

export default DaySchedule;
