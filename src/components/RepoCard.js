import React from 'react';
import styles from '../styles/styleComponent.module.css';

function RepoCard() {
  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <h3>title repositori here</h3>
        <p>language here, language</p>
        <p>
          <span className={styles.tag}>updated 15 minutes ago</span>
        </p>
      </div>
      <div className={styles.right}>
        <h4>Star 10, Fork 10, Watch 10</h4>
        <button>Detail</button>
      </div>
    </div>
  );
}

export default RepoCard;
