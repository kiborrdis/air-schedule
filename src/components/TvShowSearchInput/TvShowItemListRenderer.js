import React from 'react';
import PropTypes from 'prop-types';
import { creators } from 'shared/modules/resources';
import resourceContainer from 'shared/containers/resourceContainer';
import { Menu } from '@blueprintjs/core';
import Loader from 'shared/components/Loader';
import NonIdealState from 'shared/components/NonIdealState';

const TvShowItemListRenderer = ({
  itemsParentRef, renderItem, resources,
}) => {
  let renderedItems = [];


  if (resources.shows.loading) {
    return (
      <Menu ulRef={itemsParentRef}>
        <Loader />
      </Menu>
    );
  }

  if (resources.shows.fulfilled) {
    renderedItems = resources.shows.data
      .map(({ id, name }) => ({ id, label: name }))
      .map(renderItem)
      .filter(item => item != null);
  }

  return (
    <Menu ulRef={itemsParentRef}>
      {
        renderedItems.length !== 0
          ? renderedItems
          : <NonIdealState title="No shows have been found" />
      }
    </Menu>
  );
};

TvShowItemListRenderer.propTypes = {
  itemsParentRef: PropTypes.func,
  renderItem: PropTypes.func.isRequired,
  resources: PropTypes.shape({
    shows: PropTypes.shape({
      fulfilled: PropTypes.bool.isRequired,
      loading: PropTypes.bool.isRequired,
      data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
      })),
    }),
  }),
};

export default resourceContainer({
  shows: {
    makeActionFromProps: ({ query = 't' }) => creators.getSearchTv({ query: query || 't' }, { allPages: false }),
  },
}, { throttleInterval: 250 })(TvShowItemListRenderer);
