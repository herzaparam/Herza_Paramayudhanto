import React, { useEffect, useState } from 'react';
import styles from './styles/App.module.css';
import RepoCard from './components/RepoCard';
import SearchInput from './components/SearchInput';
import SweetScroll from 'sweet-scroll';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    width: '80%',
    height: '90%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  head: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

Modal.setAppElement('#root');

let page = 1;
let per_page = 8;
const userName = 'herzaparam';
let scrollx = 0;
function App() {
  const [user, setUser] = useState({});
  const [listRepo, setListRepo] = useState([]);
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [itemBeingEdited, setItemBeingEdited] = React.useState(null);
  console.log('hoho', itemBeingEdited);

  function openModal(_selectedItem) {
    setItemBeingEdited(_selectedItem);
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setItemBeingEdited(null);
    setIsOpen(false);
  }
  console.log('haha', user);

  const scroller = new SweetScroll({
    easing: 'easeInOutCubic',
  });

  const scrollToTop = () => {
    scrollx = 0;
    scroller.toTop(0);
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
        scroller.to((scrollx = scrollx + 350));
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
    <>
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
                  toggle={openModal}
                  selectedItem={item}
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
      <div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div style={customStyles.head}>
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
            <button onClick={closeModal}>close</button>
          </div>
          <div>I am a modal</div>
          <div>
            <input />
            <button>the modal</button>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default App;
