import React from 'react';
import PropTypes from 'prop-types';
import resourceContainer from 'shared/containers/resourceContainer';
import { creators } from 'shared/modules/resources/';
import withQueryParams from 'shared/containers/withQueryParams';
import ScheduleSidebar from '../components/ScheduleSidebar';

class ScheduleSidebarContainer extends React.Component {
  static propTypes = {
    updateQueryParams: PropTypes.func.isRequired,
    queryParams: PropTypes.shape({
      genreFilter: PropTypes.arrayOf(PropTypes.shape({})),
      scoreFilter: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    resources: PropTypes.shape({
      genres: PropTypes.shape({
        fulfilled: PropTypes.bool.isRequired,
        data: PropTypes.arrayOf(PropTypes.shape({
          name: PropTypes.string,
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        })),
      }),
    }),
  };

  constructGenreItems() {
    const { resources: { genres } } = this.props;

    if (!genres.fulfilled) {
      return [];
    }

    return genres.data.map(({ id, name }) => ({ id: String(id), label: name }));
  }

  handleGenreFilterChange = (newFilter) => {
    const { updateQueryParams } = this.props;

    updateQueryParams({ genreFilter: newFilter });
  };

  handleScoreFilterChange = (newFilter) => {
    const { updateQueryParams } = this.props;

    updateQueryParams({ scoreFilter: newFilter });
  };

  collectChildComponentProps() {
    const { queryParams } = this.props;

    return {
      genreItems: this.constructGenreItems(),
      onGenreFilterChange: this.handleGenreFilterChange,
      onScoreFilterChange: this.handleScoreFilterChange,
      genreFilter: queryParams.genreFilter || [],
      scoreFilter: queryParams.scoreFilter || [],
    };
  }

  render() {
    const { resources: { genres } } = this.props;

    if (!genres.fulfilled) {
      return null;
    }

    return <ScheduleSidebar {...this.collectChildComponentProps()} />;
  }
}

export default withQueryParams(resourceContainer({
  genres: {
    makeActionFromProps: () => creators.getGenreTvList(),
  },
})(ScheduleSidebarContainer));
