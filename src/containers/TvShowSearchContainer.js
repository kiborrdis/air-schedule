import React from 'react';
import PropTypes from 'prop-types';
import withQueryParams from 'shared/containers/withQueryParams';
import TvShowSearchInput from '../components/TvShowSearchInput';

class TvShowSearchContainer extends React.Component {
  static propTypes = {
    updateQueryParams: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      query: '',
    };
  }

  onQueryChange = (value) => {
    this.setState({ query: value });
  };

  onItemClick = ({ id }) => {
    const { updateQueryParams } = this.props;

    updateQueryParams({ showId: id });
  };

  render() {
    const { query } = this.state;

    return (
      <TvShowSearchInput
        query={query}
        onItemClick={this.onItemClick}
        onQueryChange={this.onQueryChange}
      />
    );
  }
}

export default withQueryParams(TvShowSearchContainer);
