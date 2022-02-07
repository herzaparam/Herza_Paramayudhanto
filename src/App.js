import React, { useEffect, useState } from 'react';
import styles from './styles/App.module.css';
import RepoCard from './components/RepoCard';
import SearchInput from './components/SearchInput';

function App() {
  let page = 1;
  let per_page = 6;
  const userName = 'herzaparam';

  const [listRepo, setListRepo] = useState([]);
  // console.log('haha', listRepo);
  function debounce(func, timeout = 1000) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }
  function saveInput(_query) {
    per_page = 100;
    let url = `https://api.github.com/users/${userName}/repos?page=${page}&per_page=${per_page}`;
    searchList(url, _query);
  }
  const processChange = debounce((query) => saveInput(query));

  const filterList = (_list, _query) => {
    const filtered = _list?.filter((item) => {
      if (_query === '') {
        per_page = 6;
        const url = `https://api.github.com/users/${userName}/repos?page=${page}&per_page=${per_page}`;
        return fetchList(url);
      } else if (item.name.toLowerCase().includes(_query.toLowerCase())) {
        return item;
      }
    });
    setListRepo(filtered);
  };

  const searchList = (_url, _query) => {
    fetch(_url)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Something went wrong');
        }
      })
      .then((res) => {
        console.log('res', res);
        filterList(res, _query);
      })
      .catch((error) => console.log(error));
  };
  const fetchList = (_url) => {
    fetch(_url)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Something went wrong');
        }
      })
      .then((res) => {
        console.log('res', res);
        setListRepo(res);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const url = `https://api.github.com/users/${userName}/repos?page=${page}&per_page=${per_page}`;
    fetchList(url);
  }, []);
  return (
    <header className={styles.header}>
      <h2 className="title-section">
        {listRepo.length > 0 ? `${listRepo[0].owner.login}'s` : ''} Project Overview
      </h2>
      <hr />
      <div className={styles.projectSection}>
        <SearchInput handleChange={processChange} />
        <div className={styles.gridCard}>
          {listRepo?.map((item) => {
            return (
              <RepoCard
                key={item.id}
                title={item.name}
                language={item.language}
                timeUpdated={item.updated_at}
                star={item.stargazers_count}
                fork={item.forks}
                watcher={item.watchers_count}
              />
            );
          })}
        </div>
      </div>
    </header>
  );
}

export default App;
