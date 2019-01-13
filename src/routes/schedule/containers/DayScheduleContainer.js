import React from 'react';
import PropTypes from 'prop-types';
import resourceContainer from 'shared/containers/resourceContainer';
import { creators } from 'shared/modules/resources/';
import withQueryParams from 'shared/containers/withQueryParams';
import DaySchedule from '../components/DaySchedule';

function createFilterByKey(key, valuesToFilter) {
  const valuesToInclude = [];
  const valuesToExclude = [];

  valuesToFilter.forEach(
    ({ id, exclude }) => {
      if (exclude) {
        valuesToExclude.push(id);

        return;
      }

      valuesToInclude.push(id);
    },
  );

  return (item) => {
    const keyValue = item[key];

    if (isItemToBeExcludedByValue(keyValue, valuesToExclude)) {
      return false;
    }

    if (isItemToBeIncludedByValue(keyValue, valuesToInclude)) {
      return true;
    }

    return false;
  };
}

function isItemToBeExcludedByValue(value, valuesToExclude) {
  if (Array.isArray(value)) {
    return value.some(testValue => valuesToExclude.includes(String(testValue)));
  }

  return valuesToExclude.includes(String(value));
}

function isItemToBeIncludedByValue(value, valuesToInclude) {
  if (valuesToInclude.length === 0) {
    return true;
  }

  if (Array.isArray(value)) {
    return value.some(testValue => valuesToInclude.includes(String(testValue)));
  }

  return valuesToInclude.includes(String(value));
}

class DayScheduleContainer extends React.Component {
  static propTypes = {
    updateQueryParams: PropTypes.func.isRequired,
    resources: PropTypes.shape({
      schedule: PropTypes.shape({
        fulfilled: PropTypes.bool.isRequired,
        data: PropTypes.arrayOf(PropTypes.shape({})),
      }).isRequired,
    }).isRequired,
    queryParams: PropTypes.shape({
      scoreFilter: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        exclude: PropTypes.bool,
      })),
      genreFilter: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        exclude: PropTypes.bool,
      })),
    }),
  };

  // TODO use memoize
  filterData = (data = [], scoreFilter = [], genreFilter = []) => data
    .filter(createFilterByKey('score', scoreFilter))
    .filter(createFilterByKey('genre_ids', genreFilter));

  onShowClick = (id) => {
    const { updateQueryParams } = this.props;

    updateQueryParams({ showId: id });
  };

  collectChildComponentProps() {
    const {
      resources: { schedule },
      queryParams: { scoreFilter, genreFilter },
      ...rest
    } = this.props;

    return {
      loaded: schedule.fulfilled,
      data: this.filterData(schedule.data, scoreFilter, genreFilter),
      onShowClick: this.onShowClick,
      ...rest,
    };
  }

  render() {
    return <DaySchedule {...this.collectChildComponentProps()} />;
  }
}

export default withQueryParams(resourceContainer({
  schedule: {
    makeActionFromProps: ({ date }) => creators.getDiscoverTv({
      air_date: { lte: date, gte: date },
    }),
  },
})(DayScheduleContainer));
