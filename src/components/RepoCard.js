import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/styleComponent.module.css';
import moment from 'moment';

function RepoCard({ title, language, timeUpdated, star, fork, watcher }) {

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
        <h4>
          Star <span className={styles.val}>{star}</span>, Fork{' '}
          <span className={styles.val}>{fork}</span>, Watch{' '}
          <span className={styles.val}>{watcher}</span>
        </h4>
        <button>Detail</button>
      </div>
    </div>
  );
}
RepoCard.propTypes = {
  title: PropTypes.string.isRequired,
  language: PropTypes.string,
  timeUpdated: PropTypes.string.isRequired,
  star: PropTypes.number.isRequired,
  fork: PropTypes.number.isRequired,
  watcher: PropTypes.number.isRequired,
};

export default RepoCard;
