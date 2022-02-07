import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/styleComponent.module.css';
import moment from 'moment';

function RepoCard({
  title,
  language,
  timeUpdated,
  toggle,
  selectedItem,
}) {
  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <h3>{title ?? ''}</h3>
        <p>{language ?? '-'}</p>
        <p>
          <span className={styles.tag}>
            Updated {moment(timeUpdated).startOf('day').fromNow() ?? ''}
          </span>
        </p>
      </div>
      <div className={styles.right}>
        <button onClick={() => toggle(title)}>Detail</button>
      </div>
    </div>
  );
}
RepoCard.propTypes = {
  title: PropTypes.string.isRequired,
  language: PropTypes.string,
  timeUpdated: PropTypes.string.isRequired
};

export default RepoCard;
