import React from 'react';
import PropTypes from 'prop-types';
import FormattedDate from 'shared/components/FormattedDate';
import Image from 'shared/components/Image';
import styles from './Episode.css';

const Episode = ({
  name, still_path, season_number, episode_number, air_date, overview,
}) => (
  <div className={styles.root}>
    <div className={styles.image}>
      <Image type="still" url={still_path} />
    </div>
    <div>
      <div className={styles.name}>
        {name}
      </div>
      <div className={styles.information}>
        <div>
          <span className={styles.fieldName}>
            Season
          </span>
          :
          {' '}
          {season_number}
        </div>
        <div>
          <span className={styles.fieldName}>
            Episode number
          </span>
          :
          {' '}
          {episode_number}
        </div>
        <div>
          <span className={styles.fieldName}>
            Airing
          </span>
          :
          {' '}
          <FormattedDate calendar date={air_date} />
        </div>
      </div>
      {overview && (
      <div className={styles.overview}>
        {overview}
      </div>
      )}
    </div>
  </div>
);

Episode.propTypes = {
  name: PropTypes.string.isRequired,
  still_path: PropTypes.string,
  season_number: PropTypes.number.isRequired,
  episode_number: PropTypes.number.isRequired,
  air_date: PropTypes.string,
  overview: PropTypes.string,
};

export default Episode;
