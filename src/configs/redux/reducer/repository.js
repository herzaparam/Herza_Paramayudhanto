const initialState = {
    listRepo: [],
}

const repositoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_LIST_REPO':
        return {
            listRepo: action.payload
        };
        // case 'GET_LIST_USER':
        // return {
        //   ...state,
        //   listUser: action.payload,
        // };
      default:
        return state;
    }
  };
  export default repositoryReducer;