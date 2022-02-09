import SweetScroll from 'sweet-scroll';
const scroller = new SweetScroll({
  easing: 'easeInOutCubic',
});
let scrollx = 0;
export const fetchList = (_url) => (dispatch) => {
    return new Promise((resolve, reject) => {
        fetch(_url)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error('Something went wrong');
          }
        })
        .then((res) => {
          dispatch({ type: 'GET_LIST_REPO', payload: res });
          resolve(res)
          scroller.to((scrollx = scrollx + 680));
        })
        .catch((error) => reject(error));
    });
  };