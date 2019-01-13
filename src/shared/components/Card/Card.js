import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Image from 'shared/components/Image';
import styles from './Card.css';

class Card extends React.PureComponent {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    favorite: PropTypes.bool,
    outsider: PropTypes.bool,
    thumbsUp: PropTypes.func.isRequired,
    thumbsDown: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  thumbsUp = (e) => {
    const { thumbsUp, id } = this.props;

    if (thumbsUp) {
      thumbsUp(id);
    }

    e.stopPropagation();
  };

  thumbsDown = (e) => {
    const { thumbsDown, id } = this.props;

    if (thumbsDown) {
      thumbsDown(id);
    }

    e.stopPropagation();
  };

  onClick = () => {
    const { id, onClick } = this.props;

    if (onClick) {
      onClick(id);
    }
  };

  render() {
    const {
      name, image, favorite = false, outsider = false,
    } = this.props;

    return (
      <div className={styles.root} onClick={this.onClick}>
        <Image className={styles.image} url={image} />
        <div className={styles.scorePanel}>
          <button
            type="button"
            onClick={this.thumbsUp}
            className={classNames(
              styles.scoreButton,
              styles.thumbsUp,
              { [styles.isActive]: favorite },
            )}
          />
          <button
            type="button"
            onClick={this.thumbsDown}
            className={classNames(
              styles.scoreButton,
              styles.thumbsDown,
              { [styles.isActive]: outsider },
            )}
          />
        </div>

        <div className={styles.title}>
          {name}
        </div>
      </div>
    );
  }
}

export default Card;
