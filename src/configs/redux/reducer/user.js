const initialState = {
  user: null,
  listUser: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER':
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        }
      };
      case 'GET_LIST_USER':
      return {
        ...state,
        listUser: action.payload,
      };
      case 'REMOVE_LIST_USER':
      return {
        ...state,
        listUser: [],
      };
    default:
      return state;
  }
};
export default userReducer;
