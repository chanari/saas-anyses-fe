const initState = {
  isLoading: false,
  User: [],
};
const UserReducer = (state = initState, action: any) => {
  switch (action.type) {
    case 'GET_ALL_USER_SUCCESS':
      return {
        ...state,
        User: action.data,
      };
    default:
      return state;
  }
};

export default UserReducer;
