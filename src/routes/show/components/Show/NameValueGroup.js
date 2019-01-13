import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './NameValueGroup.css';

const NameValueGroup = ({ data, type = 'grid' }) => (
  <div className={classNames(styles.root, {
    [styles.grid]: type === 'grid',
    [styles.row]: type === 'row',
  })}
  >
    {
      data.map(({ name, value }) => (
        <div key={name + value} className={styles.field}>
          <div className={styles.name}>
            {name}
          </div>
          <div className={styles.value}>
            {value || '-'}
          </div>
        </div>
      ))
    }
  </div>
);

NameValueGroup.propTypes = {
  type: PropTypes.oneOf(['grid', 'row']),
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })),
};

export default NameValueGroup;
