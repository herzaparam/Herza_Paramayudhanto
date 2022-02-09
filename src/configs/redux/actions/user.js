export const removeListUser = () => (dispatch) => dispatch({type: 'REMOVE_LIST_USER'})

export const getUser = (_name) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const url = `https://api.github.com/users/${_name}`;
    fetch(url)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Something went wrong');
        }
      })
      .then((res) => {
        // console.log('redux getuser', res);
        dispatch({ type: 'GET_USER', payload: res });
        resolve(res);
        // setUser(res);
      })
      .catch((error) => reject(error));
  });
};

export const getListUser = (_q) => (dispatch) => {
  return new Promise((resolve, reject) => {
    let url = `https://api.github.com/search/users`;
    if (_q !== '') {
      url += '?q=' + _q;
    }
    // console.log('hoho', url);
    fetch(url)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Something went wrong');
        }
      })
      .then((res) => {
        // console.log('redux getlistuser', res);
        dispatch({ type: 'GET_LIST_USER', payload: res.items });
        resolve(res.items)
        // setListUser(res.items);
      })
      .catch((error) => reject(error));
  });
};
