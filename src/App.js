import React from 'react';
import styles from './styles/App.module.css';
import RepoCard from './components/RepoCard';
import SearchInput from './components/SearchInput';

function App() {
  return (
    <header className={styles.header}>
      <h2 className="title-section">Project Overview</h2>
      <hr />
      <div className={styles.projectSection}>
        <SearchInput />
        <div className={styles.gridCard}>
          <RepoCard />
          <RepoCard />
          <RepoCard />
          <RepoCard />
          <RepoCard />
          <RepoCard />
          {/* <RepoCard />
          <RepoCard /> */}
        </div>
      </div>
    </header>
  );
}

export default App;
