import React, { useEffect, useState } from 'react';
import styles from './styles/App.module.css';
import RepoCard from './components/RepoCard';
import SearchInput from './components/SearchInput';

let page = 1;
let per_page = 8;
function App() {
  const userName = 'herzaparam';

  const [user, setUser] = useState({});
  const [listRepo, setListRepo] = useState([]);
  console.log('haha', user);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  const handleLoad = () => {
    per_page = per_page + 8;
    const url = `https://api.github.com/users/${userName}/repos?page=${page}&per_page=${per_page}`;
    fetchList(url);
  };

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
        per_page = 8;
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
        // console.log('res', res);
        setListRepo(res);
      })
      .catch((error) => console.log(error));
  };
  const fetchUser = () => {
    const url = `https://api.github.com/users/${userName}`;
    fetch(url)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Something went wrong');
        }
      })
      .then((res) => {
        // console.log('res', res);
        setUser(res);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const url = `https://api.github.com/users/${userName}/repos?page=${page}&per_page=${per_page}`;
    fetchList(url);
    fetchUser();
  }, []);
  return (
    <header className={styles.header}>
      <h2 className="title-section">
        {`${user.login}'s` ?? ''} Project Overview{' '}
        <span className={styles.totalRepo}>
          {user.public_repos && `(${user.public_repos})`}
        </span>{' '}
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
        {listRepo.length > 0 && listRepo.length < user.public_repos ? (
          <button className={styles.btnLoad} onClick={() => handleLoad()}>
            Load More {`+${user.public_repos - listRepo.length}`}
          </button>
        ) : (
          <button className={styles.btnLoad} onClick={() => scrollToTop()}>
            Back To Top
          </button>
        )}
      </div>
    </header>
  );
}

export default App;
