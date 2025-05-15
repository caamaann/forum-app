import { ActionType } from '../actions/actionTypes';

const initialState = {
  users: [],
  isLoading: false,
  error: null,
};

function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_USERS:
      return {
        ...state,
        users: action.payload.users,
      };
    case ActionType.SET_USERS_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    case ActionType.SET_USERS_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
}

export default userReducer;
