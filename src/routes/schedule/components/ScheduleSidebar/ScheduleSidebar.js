import React from 'react';
import PropTypes from 'prop-types';
import CategoryFilterSelect from 'shared/components/CategoryFilterSelect';
import { FormGroup } from '@blueprintjs/core';
import Sidebar from 'shared/components/Sidebar';
import withQueryParams from 'shared/containers/withQueryParams';

const scoreItems = [
  { id: '1', label: 'Favorites' },
  { id: '0', label: 'Unscored' },
  { id: '-1', label: 'Outsiders' },
];

// TODO there was a lot of rerenders on start up, check this is out
const ScheduleSidebar = ({
  genreItems,
  onGenreFilterChange,
  onScoreFilterChange,
  genreFilter,
  scoreFilter,
}) => (
  <Sidebar title="Filters">
    <FormGroup label="Scores">
      <CategoryFilterSelect
        items={scoreItems}
        onChange={onScoreFilterChange}
        value={scoreFilter}
        fill
      />
    </FormGroup>

    <FormGroup label="Genres">
      <CategoryFilterSelect
        excludable
        items={genreItems}
        onChange={onGenreFilterChange}
        value={genreFilter}
        fill
      />
    </FormGroup>
  </Sidebar>
);

ScheduleSidebar.propTypes = {
  genreItems: PropTypes.arrayOf(PropTypes.shape({})),
  genreFilter: PropTypes.arrayOf(PropTypes.shape({})),
  scoreFilter: PropTypes.arrayOf(PropTypes.shape({})),
  onGenreFilterChange: PropTypes.func.isRequired,
  onScoreFilterChange: PropTypes.func.isRequired,
};

export default withQueryParams(ScheduleSidebar);
