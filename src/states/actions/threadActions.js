import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { ActionType } from './actionTypes';

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function setIsLoadingActionCreator(isLoading) {
  return {
    type: ActionType.SET_IS_LOADING,
    payload: {
      isLoading,
    },
  };
}

function setErrorActionCreator(error) {
  return {
    type: ActionType.SET_ERROR,
    payload: {
      error,
    },
  };
}

function setFilterCategoryActionCreator(category) {
  return {
    type: ActionType.SET_FILTER_CATEGORY,
    payload: {
      category,
    },
  };
}

function asyncGetAllThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(setIsLoadingActionCreator(true));
    try {
      const threads = await api.getAllThreads();
      const users = await api.getAllUsers();
      const mappingThreads = threads.map((thread) => {
        thread.owner = users.find((user) => user.id === thread.ownerId);
        return thread;
      });
      dispatch(receiveThreadsActionCreator(mappingThreads));
    } catch (error) {
      dispatch(setErrorActionCreator(error.message));
    } finally {
      dispatch(setIsLoadingActionCreator(false));
      dispatch(hideLoading());
    }
  };
}

function asyncGetThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(setIsLoadingActionCreator(true));

    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      dispatch(setErrorActionCreator(error.message));
    } finally {
      dispatch(setIsLoadingActionCreator(false));
      dispatch(hideLoading());
    }
  };
}

function asyncCreateThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
      return thread;
    } catch (error) {
      dispatch(setErrorActionCreator(error.message));
      return null;
    } finally {
      dispatch(hideLoading());
    }
  };
}

function toggleUpvoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_UPVOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleDownvoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWNVOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function neutralVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.NEUTRAL_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncToggleUpvoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState().auth;

    if (!authUser) {
      alert('Please login to vote');
      return;
    }

    dispatch(toggleUpvoteThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.upvoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleUpvoteThreadActionCreator({ threadId, userId: authUser.id }));
    }
  };
}

function asyncToggleDownvoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState().auth;

    if (!authUser) {
      alert('Please login to vote');
      return;
    }

    dispatch(toggleDownvoteThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.downvoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleDownvoteThreadActionCreator({ threadId, userId: authUser.id }));
    }
  };
}

function asyncNeutralVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState().auth;

    if (!authUser) {
      alert('Please login to vote');
      return;
    }

    dispatch(neutralVoteThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.neutralVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(neutralVoteThreadActionCreator({ threadId, userId: authUser.id }));
    }
  };
}

export {
  receiveThreadsActionCreator,
  addThreadActionCreator,
  receiveThreadDetailActionCreator,
  setIsLoadingActionCreator,
  setErrorActionCreator,
  setFilterCategoryActionCreator,
  asyncGetAllThreads,
  asyncGetThreadDetail,
  asyncCreateThread,
  toggleUpvoteThreadActionCreator,
  toggleDownvoteThreadActionCreator,
  neutralVoteThreadActionCreator,
  asyncToggleUpvoteThread,
  asyncToggleDownvoteThread,
  asyncNeutralVoteThread,
};
