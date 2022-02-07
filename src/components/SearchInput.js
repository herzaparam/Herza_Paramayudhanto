import React from 'react';
import styles from '../styles/styleComponent.module.css'
import searchicon from '../assets/icons8-search.svg'

function SearchInput() {
  return (
    <div className={styles.groupInput}>
      <img src={searchicon} alt="icon" />
      <input type="text" placeholder='Type repo here'/>
    </div>
  );
}

export default SearchInput;
