import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { creators } from 'shared/modules/resources/';
import resourceContainer from 'shared/containers/resourceContainer';
import Schedule from '../components/Schedule';

class ScheduleContainer extends React.Component {
  static propTypes = {
    postShowsScores: PropTypes.func.isRequired,
    resources: PropTypes.shape({
      scores: PropTypes.shape({
        fulfilled: PropTypes.bool.isRequired,
      }),
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      startDayOffset: 1,
      numberOfDays: 3,
    };
  }

  loadPreviousDay = () => {
    this.setState(({ startDayOffset, numberOfDays }) => ({
      startDayOffset: startDayOffset + 1,
      numberOfDays: numberOfDays + 1,
    }));
  };

  loadNextDay = () => {
    this.setState(({ numberOfDays }) => ({
      numberOfDays: numberOfDays + 1,
    }));
  };

  // TODO use memoization here
  generateDatesForSchedule() {
    const dates = [];
    const { startDayOffset, numberOfDays } = this.state;
    const currentDate = moment();

    currentDate.subtract(startDayOffset, 'days');

    for (let i = 0; i < numberOfDays; i += 1) {
      dates.push(currentDate.format('YYYY-MM-DD'));

      currentDate.add(1, 'days');
    }

    return dates;
  }

  thumbsUp = (id) => {
    const { postShowsScores } = this.props;

    postShowsScores({ [id]: 1 });
  };

  thumbsDown = (id) => {
    const { postShowsScores } = this.props;

    postShowsScores({ [id]: -1 });
  };

  render() {
    const { resources: { scores } } = this.props;

    if (!scores.fulfilled) {
      return null;
    }

    return (
      <Schedule
        thumbsUp={this.thumbsUp}
        thumbsDown={this.thumbsDown}
        loadNextDay={this.loadNextDay}
        loadPreviousDay={this.loadPreviousDay}
        dates={this.generateDatesForSchedule()}
      />
    );
  }
}

const mapDispatchToProps = {
  postShowsScores: creators.postShowsScores,
};

// TODO update resource container to be able omit data and onlu
//      track request status(maybe rename container after update)
export default connect(null, mapDispatchToProps)(resourceContainer({
  scores: {
    makeActionFromProps: () => creators.getShowsScores(),
  },
  genres: {
    makeActionFromProps: () => creators.getGenreTvList(),
  },
  configuration: {
    makeActionFromProps: () => creators.getConfiguration(),
  },
})(ScheduleContainer));
