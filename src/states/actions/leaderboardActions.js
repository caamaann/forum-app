import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { ActionType } from './actionTypes';

function receiveLeaderboardsActionCreator(leaderboards) {
  return {
    type: ActionType.RECEIVE_LEADERBOARDS,
    payload: {
      leaderboards,
    },
  };
}

function setLeaderboardLoadingActionCreator(isLoading) {
  return {
    type: ActionType.SET_LEADERBOARD_LOADING,
    payload: {
      isLoading,
    },
  };
}

function setLeaderboardErrorActionCreator(error) {
  return {
    type: ActionType.SET_LEADERBOARD_ERROR,
    payload: {
      error,
    },
  };
}

function asyncGetLeaderboards() {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(setLeaderboardLoadingActionCreator(true));

    try {
      const leaderboards = await api.getLeaderboard();
      dispatch(receiveLeaderboardsActionCreator(leaderboards));
    } catch (error) {
      dispatch(setLeaderboardErrorActionCreator(error.message));
    } finally {
      dispatch(setLeaderboardLoadingActionCreator(false));
      dispatch(hideLoading());
    }
  };
}

export {
  receiveLeaderboardsActionCreator,
  setLeaderboardLoadingActionCreator,
  setLeaderboardErrorActionCreator,
  asyncGetLeaderboards,
};
