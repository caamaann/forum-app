import { ActionType } from '../actions/actionTypes';

const initialState = {
  authUser: null,
  isAuthenticated: false,
  isAuthError: false,
  authErrorMessage: '',
};

function authReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionType.SET_AUTH_USER:
      return {
        ...state,
        authUser: action.payload,
        isAuthenticated: Boolean(action.payload),
        isAuthError: false,
        authErrorMessage: '',
      };
    case ActionType.UNSET_AUTH_USER:
      return {
        ...state,
        authUser: null,
        isAuthenticated: false,
      };
    case ActionType.SET_AUTH_ERROR:
      return {
        ...state,
        isAuthError: true,
        authErrorMessage: action.payload,
      };
    case ActionType.CLEAR_AUTH_ERROR:
      return {
        ...state,
        isAuthError: false,
        authErrorMessage: '',
      };
    default:
      return state;
  }
}

export default authReducer;
