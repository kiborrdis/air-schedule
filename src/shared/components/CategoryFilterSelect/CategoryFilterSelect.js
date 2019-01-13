import React from 'react';
import PropTypes from 'prop-types';
import { MultiSelect as BlueprintMultiSelect } from '@blueprintjs/select';
import { MenuItem } from '@blueprintjs/core';

const allItem = {
  label: 'All',
  id: '__all',
};

class CategoryFilterSelect extends React.PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })),
    value: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      exclude: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    })),
    onChange: PropTypes.func,
    excludable: PropTypes.bool,
  };

  static defaultProps = {
    excludable: false,
  };

  onRemove = (_, idIndex) => {
    const { value, onChange } = this.props;
    const newValue = [...value];

    newValue.splice(idIndex, 1);

    if (onChange) {
      onChange(newValue);
    }
  };

  onSelect = ({ id }) => {
    const { value, onChange, excludable } = this.props;

    if (id === '__all') {
      onChange([]);

      return;
    }

    const selectedElementValueIndex = value.findIndex(({ id: testId }) => testId === id);

    if (selectedElementValueIndex !== -1) {
      const selectedElementValue = value[selectedElementValueIndex];

      if (excludable && !selectedElementValue.exclude) {
        const newValue = [...value];
        newValue[selectedElementValueIndex] = { ...selectedElementValue, exclude: true };

        onChange(newValue);

        return;
      }

      this.onRemove(null, selectedElementValueIndex);

      return;
    }

    if (onChange) {
      onChange([...value, { id }]);
    }
  };

  tagRenderer = ({ label }) => label;

  getTagProps = (tagValue, index) => {
    const { value } = this.props;

    return {
      value: tagValue,
      intent: value[index].exclude ? 'warning' : 'none',
    };
  };

  itemRenderer = ({ label, id }, { handleClick, modifiers }) => {
    const { value } = this.props;
    const { active } = modifiers;
    let status;
    let intent = 'none';

    const selectedElementValueIndex = value.findIndex(({ id: testId }) => testId === id);

    if (value.length === 0 && id === '__all') {
      status = 'included';
      intent = 'success';
    } else if (selectedElementValueIndex !== -1) {
      status = value[selectedElementValueIndex].exclude ? 'excluded' : 'included';
      intent = value[selectedElementValueIndex].exclude ? 'warning' : 'success';
    }

    return (
      <MenuItem
        key={id}
        text={label}
        label={status}
        intent={intent}
        onClick={handleClick}
        active={active}
        disabled={modifiers.disabled}
      />
    );
  };

  getSelectedItems() {
    const { items, value } = this.props;

    return value.reduce((memo, { id: itemId }) => {
      const selectedItem = items.find(({ id }) => String(id) === String(itemId));

      if (selectedItem) {
        memo.push(selectedItem);
      }

      return memo;
    }, []);
  }

  render() {
    const { items } = this.props;

    return (
      <BlueprintMultiSelect
        itemRenderer={this.itemRenderer}
        items={[allItem, ...items]}
        popoverProps={{ minimal: true, targetTagName: 'div' }}
        selectedItems={this.getSelectedItems()}
        onItemSelect={this.onSelect}
        tagRenderer={this.tagRenderer}
        tagInputProps={{ onRemove: this.onRemove, fill: false, tagProps: this.getTagProps }}
        resetOnSelect
      />
    );
  }
}

export default CategoryFilterSelect;
