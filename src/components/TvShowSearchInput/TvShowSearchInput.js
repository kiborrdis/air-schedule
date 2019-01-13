import React from 'react';
import SuggestInput from 'shared/components/SuggestInput';
import ListRenderer from './TvShowItemListRenderer';

const TvShowSearchInput = props => (
  <SuggestInput {...props} itemListComponent={ListRenderer} />
);

export default TvShowSearchInput;
