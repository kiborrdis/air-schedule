import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';
import styles from './Grid.css';

const Grid = ({ data, sharedProps, element: Element }) => (
  <div className={styles.root}>
    <div className={styles.content}>
      {
        data.map((elementData, index) => (
          <Element
            {...sharedProps}
            key={elementData.id || index}
            id={elementData.id}
            name={elementData.name}
            favorite={elementData.score === 1}
            outsider={elementData.score === -1}
            image={elementData.poster_path || 'https://vignette.wikia.nocookie.net/mlp/images/4/4b/Rainbow_Dash_Wonderbolt_fantasy_cropped_S1E3.png/revision/latest?cb=20130307050701'}
          />
        ))
      }
    </div>
  </div>
);

Grid.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  sharedProps: PropTypes.shape({}),
  element: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
};

Grid.defaultProps = {
  element: Card,
};

export default Grid;
