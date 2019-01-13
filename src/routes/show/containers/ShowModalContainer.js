import React from 'react';
import PropTypes from 'prop-types';
import withQueryParams from 'shared/containers/withQueryParams';
import ShowModal from '../components/ShowModal';

class ShowModalContainer extends React.Component {
  static propTypes = {
    updateQueryParams: PropTypes.func.isRequired,
    queryParams: PropTypes.shape({
      showId: PropTypes.string,
    }).isRequired,
  };

  onClose = () => {
    const { updateQueryParams } = this.props;

    updateQueryParams({ showId: undefined });
  };

  render() {
    const { queryParams: { showId } } = this.props;

    return <ShowModal onClose={this.onClose} showId={showId} />;
  }
}

export default withQueryParams(ShowModalContainer);
