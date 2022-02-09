const initialState = {
    listRepo: [],
}

const repositoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_LIST_REPO':
        return {
            listRepo: action.payload
        };
        case 'FILTERED_REPO':
        return {
          listRepo: action.payload
        };
      default:
        return state;
    }
  };
  export default repositoryReducer;