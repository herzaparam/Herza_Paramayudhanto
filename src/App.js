import React, { useEffect, useState } from 'react';
import styles from './styles/App.module.css';
import RepoCard from './components/RepoCard';
import SearchInput from './components/SearchInput';
import SweetScroll from 'sweet-scroll';
import Modal from 'react-modal';
import githublogo from './assets/GitHub-Logo (1).png';
import { useSelector, useDispatch } from 'react-redux';
import {
  getUser,
  getListUser,
  removeListUser,
} from './configs/redux/actions/user';
import { fetchList } from './configs/redux/actions/repository';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    minWidth: '30%',
    maxWidth: '50%',
    height: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
};

Modal.setAppElement('#root');

let page = 1;
let per_page = 8;
// const userName = 'herzaparam';
let scrollx = 0;
function App() {
  const [userName, setUserName] = useState('');
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [itemBeingViewed, setItemBeingViewed] = React.useState(null);
  const [language, setLanguage] = React.useState({});
  const [contributor, setContributor] = React.useState([]);
  const { user, listUser } = useSelector((state) => state.userReducer);
  const { listRepo } = useSelector((state) => state.repositoryReducer);
  // console.log('redux getuser app', user);
  // console.log('redux getlistrepo app', repository);

  const dispatch = useDispatch();

  const fetchDetailRepositories = (_repositoriesName) => {
    const _url = `https://api.github.com/repos/${userName}/${_repositoriesName}`;
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
        setItemBeingViewed(res);
        fetchContributorRepo(res.contributors_url);
        fetchLanguageRepo(res.languages_url);
      })
      .catch((error) => console.log(error));
  };

  function openModal(_selectedItem) {
    fetchDetailRepositories(_selectedItem);
    setIsOpen(true);
  }

  function closeModal() {
    setItemBeingViewed(null);
    setLanguage({});
    setContributor([]);
    setIsOpen(false);
  }
  // console.log('haha', user);

  const scroller = new SweetScroll({
    easing: 'easeInOutCubic',
  });

  const scrollToTop = () => {
    scrollx = 0;
    scroller.toTop(0);
  };

  const handleLoad = () => {
    per_page = per_page + 8;
    const url = `https://api.github.com/users/${user.login}/repos?page=${page}&per_page=${per_page}`;
    dispatch(fetchList(url));
  };

  function debounce(func, timeout = 750) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  function saveInput(_query) {
    // per_page = 100;
    // let url = `https://api.github.com/users/${userName}/repos?page=${page}&per_page=${per_page}`;
    // searchList(url, _query);
    setUserName(_query);
    if (_query !== '') {
      // searchUser(_query);
      dispatch(getListUser(_query));
    } else {
      dispatch(removeListUser());
    }
  }
  function saveInputRepo(_query) {
    per_page = 100;
    let url = `https://api.github.com/users/${userName}/repos?page=${page}&per_page=${per_page}`;
    searchList(url, _query);
  }
  const processChange = debounce((query) => saveInput(query));
  const handleChange = debounce((query) => saveInputRepo(query));

  const filterList = (_list, _query) => {
    const filtered = _list?.filter((item) => {
      if (_query === '') {
        per_page = 8;
        const url = `https://api.github.com/users/${userName}/repos?page=${page}&per_page=${per_page}`;
        return dispatch(fetchList(url));
      } else if (item.name.toLowerCase().includes(_query.toLowerCase())) {
        return item;
      }
    });
    dispatch({ type: 'FILTERED_REPO', payload: filtered });
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
        // console.log('res', res);
        filterList(res, _query);
      })
      .catch((error) => console.log(error));
  };

  const fetchLanguageRepo = (_url) => {
    fetch(_url)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Something went wrong');
        }
      })
      .then((res) => {
        setLanguage(res);
      })
      .catch((error) => console.log(error));
  };
  const fetchContributorRepo = (_url) => {
    fetch(_url)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Something went wrong');
        }
      })
      .then((res) => {
        setContributor(res);
      })
      .catch((error) => console.log(error));
  };

  const renderLanguage = () => {
    const arr = [];
    for (const property in language) {
      arr.push(property);
    }
    return arr;
  };

  return (
    <>
      <header className={styles.header}>
        <img src={githublogo} alt="" />
        <h1>Welcome Developers!</h1>
        <p>You can find your list repositories by typing your username</p>
        <input
          type="text"
          placeholder="Type your github username"
          onChange={(e) => processChange(e.target.value)}
        />
        <div className={styles.listUserContainer}>
          {listUser.length > 0 &&
            listUser.map((item) => {
              return (
                <div
                  className={styles.listUserContent}
                  onClick={() => {
                    setUserName(item.login);
                    // fetchUser(item.login);
                    dispatch(getUser(item.login));
                    const url = `https://api.github.com/users/${item.login}/repos?page=${page}&per_page=${per_page}`;
                    dispatch(fetchList(url));
                    dispatch(removeListUser());
                    scroller.to((scrollx = scrollx + 680));
                  }}
                  key={item.id}
                >
                  <img src={item.avatar_url} alt="" />
                  <p>{item.login}</p>
                </div>
              );
            })}
        </div>
      </header>
      {user && (
        <>
          <main className={styles.main}>
            <div className={styles.projectUserTitle}>
              <img src={user?.avatar_url} alt="" />
              <h2 className="title-section">
                {`${user.login}'s` ?? ''} Project Overview{' '}
                <span className={styles.totalRepo}>
                  {user.public_repos && `(${user.public_repos})`}
                </span>{' '}
              </h2>
            </div>
            <hr />
            <div className={styles.projectSection}>
              <SearchInput handleChange={handleChange} />
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
                      toggle={openModal}
                      selectedItem={item}
                    />
                  );
                })}
              </div>
              {listRepo.length > 0 && listRepo.length < user.public_repos ? (
                <button
                  className={styles.btnLoad}
                  onClick={() => handleLoad()}
                  disabled={listRepo.length < 8}
                >
                  Load More {`+${user.public_repos - listRepo.length}`}
                </button>
              ) : (
                <button
                  className={styles.btnLoad}
                  onClick={() => scrollToTop()}
                >
                  Back To Top
                </button>
              )}
            </div>
          </main>
          <div>
            <Modal
              isOpen={modalIsOpen}
              // onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <div className={styles.head}>
                <h2
                  className="title-section"
                  ref={(_subtitle) => (subtitle = _subtitle)}
                >
                  {itemBeingViewed?.name ?? ''}
                </h2>
                <span
                  className={styles.close}
                  onClick={() => closeModal(!modalIsOpen)}
                >
                  &times;
                </span>
              </div>
              <p style={{ alignSelf: 'flex-start' }}>language :</p>
              <div className={styles.groupLanguage}>
                {renderLanguage()?.map((item, index) => {
                  return (
                    <h3 className={styles.modalVisibility} key={index}>
                      {item}
                    </h3>
                  );
                })}
              </div>
              <div className={styles.iconContainer}>
                <div className={styles.modalIcon}>
                  <p>Fork</p>
                  <p>
                    <span className={styles.val}>
                      {itemBeingViewed?.forks_count ?? ''}
                    </span>
                  </p>
                </div>
                <div className={styles.modalIcon}>
                  <p>Star</p>
                  <p>
                    <span className={styles.val}>
                      {itemBeingViewed?.forks_count ?? ''}
                    </span>
                  </p>
                </div>
                <div className={styles.modalIcon}>
                  <p>Watch</p>
                  <p>
                    <span className={styles.val}>
                      {itemBeingViewed?.forks_count ?? ''}
                    </span>
                  </p>
                </div>
              </div>
              <p className={styles.modalSource}>Contributor :</p>
              <div className={styles.groupButton}>
                {contributor?.map((item) => {
                  return (
                    <div className={styles.cardContributor} key={item.id}>
                      <img src={item.avatar_url} alt="" />
                      <div>
                        <h4>{item.login}</h4>
                        <a href={item.html_url}>See More</a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Modal>
          </div>
        </>
      )}
    </>
  );
}

export default App;
