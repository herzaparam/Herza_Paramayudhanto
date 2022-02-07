import React from 'react';
import styles from '../styles/styleComponent.module.css';
import searchicon from '../assets/icons8-search.svg';

function SearchInput({ handleChange }) {
  return (
    <div className={styles.groupInput}>
      <img src={searchicon} alt="icon" />
      <input
        type="text"
        placeholder="Type repo here"
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}

export default SearchInput;
