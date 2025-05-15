import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { ActionType } from './actionTypes';
import api from '../../utils/api';

function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}

function setUsersLoadingActionCreator(isLoading) {
  return {
    type: ActionType.SET_USERS_LOADING,
    payload: {
      isLoading,
    },
  };
}

function setUsersErrorActionCreator(error) {
  return {
    type: ActionType.SET_USERS_ERROR,
    payload: {
      error,
    },
  };
}

function asyncGetAllUsers() {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(setUsersLoadingActionCreator(true));
    try {
      const threads = await api.getAllUsers();
      dispatch(receiveUsersActionCreator(threads));
    } catch (error) {
      dispatch(setUsersErrorActionCreator(error.message));
    } finally {
      dispatch(setUsersLoadingActionCreator(false));
      dispatch(hideLoading());
    }
  };
}

export {
  receiveUsersActionCreator,
  setUsersLoadingActionCreator,
  setUsersErrorActionCreator,
  asyncGetAllUsers,
};
