import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { ActionType } from './actionTypes';

function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: authUser,
  };
}

function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
  };
}

function setAuthErrorActionCreator(message) {
  return {
    type: ActionType.SET_AUTH_ERROR,
    payload: message,
  };
}

function clearAuthErrorActionCreator() {
  return {
    type: ActionType.CLEAR_AUTH_ERROR,
  };
}

function asyncRegister({ name, email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.register({ name, email, password });
      return true;
    } catch (error) {
      dispatch(setAuthErrorActionCreator(error.message));
      return false;
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncLogin({ email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const token = await api.login({ email, password });
      localStorage.setItem('accessToken', token);
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
      return true;
    } catch (error) {
      dispatch(setAuthErrorActionCreator(error.message));
      return false;
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncPreloadUser() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } catch {
      localStorage.removeItem('accessToken');
      dispatch(unsetAuthUserActionCreator());
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncLogout() {
  return (dispatch) => {
    localStorage.removeItem('accessToken');
    dispatch(unsetAuthUserActionCreator());
  };
}

export {
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  setAuthErrorActionCreator,
  clearAuthErrorActionCreator,
  asyncRegister,
  asyncLogin,
  asyncPreloadUser,
  asyncLogout,
};
