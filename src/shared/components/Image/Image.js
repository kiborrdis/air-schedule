import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Image = ({
  url, baseUrl, posterUrl, className,
}) => (
  <img
    alt={`${url} poster`}
    className={className}
    src={`${baseUrl}${posterUrl}${url}`}
  />
);

const mapStateToProps = ({ resources: { configuration } }, { type = 'poster' }) => {
  let props = {};

  if (configuration.main) {
    props = {
      baseUrl: configuration.main.images.base_url,
      posterUrl: configuration.main.images[`${type}_sizes`][3],
    };
  }

  return props;
};

Image.propTypes = {
  url: PropTypes.string,
  baseUrl: PropTypes.string.isRequired,
  posterUrl: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default connect(mapStateToProps)(Image);
