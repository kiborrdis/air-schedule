import React from 'react';
import PropTypes from 'prop-types';
import { Suggest as BlueprintSuggestInput } from '@blueprintjs/select';
import { MenuItem } from '@blueprintjs/core';

class SuggestInput extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })),
    query: PropTypes.string,
    onItemClick: PropTypes.func,
    onQueryChange: PropTypes.func,
    itemListComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  };

  renderItem = ({ label, id }, { handleClick, active }) => {
    const { loading } = this.props;

    return (
      <MenuItem
        key={id}
        text={label}
        onClick={handleClick}
        active={active}
        disabled={loading}
      />
    );
  };

  render() {
    const {
      items = [], query, onItemClick, onQueryChange, itemListComponent: ItemListComponent,
    } = this.props;

    return (
      <BlueprintSuggestInput
        items={items}
        query={query}
        itemListRenderer={ItemListComponent && (props => <ItemListComponent {...props} />)}
        onItemSelect={onItemClick}
        onQueryChange={onQueryChange}
        inputValueRenderer={({ label }) => label}
        itemRenderer={this.renderItem}
      />
    );
  }
}

export default SuggestInput;
