import React from 'react';
import PropTypes from 'prop-types';
import resourceContainer from 'shared/containers/resourceContainer';
import { creators } from 'shared/modules/resources';
import { Spinner } from '@blueprintjs/core';
import Image from 'shared/components/Image';
import FormattedDate from 'shared/components/FormattedDate';
import Episode from './Episode';
import NameValueGroup from './NameValueGroup';
import styles from './Show.css';

const Show = ({ resources: { show: { fulfilled, data } } }) => {
  if (!fulfilled) {
    return <Spinner />;
  }

  const {
    genres,
    name,
    in_production,
    poster_path,
    first_air_date,
    overview,
    origin_country,
    seasons,
    number_of_episodes,
    production_companies,
    networks,
    homepage,
    last_episode_to_air,
    next_episode_to_air,
    episode_run_time,
    type,
  } = data;

  const subtitleData = [
    { name: 'Status', value: in_production ? 'in production' : 'completed' },
    { name: 'Country', value: origin_country[0] },
    { name: 'Genres', value: genres.map(genre => genre.name).join(', ') },
  ];
  const additionalData = [
    { name: 'Last season', value: seasons[seasons.length - 1].season_number },
    { name: 'Number of episodes', value: number_of_episodes },
    { name: 'Production company', value: production_companies[0] && production_companies[0].name },
    { name: 'Network', value: networks[0] && networks[0].name },
    { name: 'First air date', value: first_air_date },
    { name: 'Homepage', value: homepage },
    { name: 'Type', value: type },
    { name: 'Episode length', value: episode_run_time[0] },
  ];


  return (
    <div className={styles.root}>
      <div className={styles.main}>
        <Image className={styles.mainPoster} url={poster_path} />

        <div className={styles.mainInfo}>
          <h1 className={styles.title}>
            {name}
            {' '}
            <FormattedDate format="YYYY" date={first_air_date} />
          </h1>

          <div className={styles.subtitle}>
            <NameValueGroup data={subtitleData} type="row" />
          </div>

          <div className={styles.overview}>
            <h2 className={styles.overviewTitle}>
              Overview
            </h2>
            <div className={styles.mainText}>
              {overview}
            </div>
          </div>

          <NameValueGroup data={additionalData} />
        </div>
      </div>

      {last_episode_to_air && (
      <div className={styles.block}>
        <div className={styles.episodDescription}>
          Last aired episode:
        </div>
        <Episode {...last_episode_to_air} />
      </div>
      )}

      {next_episode_to_air && (
      <div className={styles.block}>
        <div className={styles.episodDescription}>
          Next aired episode:
        </div>
        <Episode {...next_episode_to_air} />
      </div>
      )}
    </div>
  );
};

Show.propTypes = {
  resources: PropTypes.shape({
    show: PropTypes.shape({
      data: PropTypes.shape({
        genres: PropTypes.arrayOf(PropTypes.shape({
          name: PropTypes.string,
        })),
        name: PropTypes.string,
        in_production: PropTypes.bool,
        poster_path: PropTypes.string,
        first_air_date: PropTypes.string,
        last_air_date: PropTypes.string,
        overview: PropTypes.string,
        origin_country: PropTypes.arrayOf(PropTypes.string),
        seasons: PropTypes.arrayOf(PropTypes.shape({})),
        number_of_episodes: PropTypes.number,
        production_companies: PropTypes.arrayOf(PropTypes.shape({
          name: PropTypes.string,
        })),
        networks: PropTypes.arrayOf(PropTypes.shape({
          name: PropTypes.string,
        })),
        homepage: PropTypes.string,
        original_name: PropTypes.string,
        last_episode_to_air: PropTypes.shape({}),
        next_episode_to_air: PropTypes.shape({}),
        episode_run_time: PropTypes.arrayOf(PropTypes.number),
        type: PropTypes.string,
      }),
      fulfilled: PropTypes.bool,
      loading: PropTypes.bool,
    }),
  }),
};

export default resourceContainer({
  show: {
    makeActionFromProps: ({ id }) => creators.getTvId({ id }),
  },
  configuration: {
    makeActionFromProps: () => creators.getConfiguration(),
  },
})(Show);
