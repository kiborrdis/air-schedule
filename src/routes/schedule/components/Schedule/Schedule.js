import React from 'react';
import PropTypes from 'prop-types';
import DefaultContentLayout from 'shared/components/DefaultContentLayout';
import styles from './Schedule.css';
import ScheduleSidebarContainer from '../../containers/ScheduleSidebarContainer';
import DayScheduleContainer from '../../containers/DayScheduleContainer';

const Schedule = ({
  loadNextDay, dates, thumbsUp, thumbsDown,
}) => (
  <DefaultContentLayout panel={(
    <ScheduleSidebarContainer />
    )}
  >
    <div className={styles.content}>
      {
      dates.map(date => (
        <DayScheduleContainer date={date} key={date} thumbsUp={thumbsUp} thumbsDown={thumbsDown} />
      ))
    }
    </div>

    <div className={styles.footer}>
      <button type="button" onClick={loadNextDay}>
        Load one more day
      </button>
    </div>
  </DefaultContentLayout>
);

Schedule.propTypes = {
  loadNextDay: PropTypes.func.isRequired,
  thumbsUp: PropTypes.func.isRequired,
  thumbsDown: PropTypes.func.isRequired,
  dates: PropTypes.arrayOf(PropTypes.string),
};

export default Schedule;
