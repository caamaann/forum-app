import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { ActionType } from './actionTypes';

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function toggleUpvoteCommentActionCreator({ threadId, commentId, userId }) {
  return {
    type: ActionType.TOGGLE_UPVOTE_COMMENT,
    payload: {
      threadId,
      commentId,
      userId,
    },
  };
}

function toggleDownvoteCommentActionCreator({ threadId, commentId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWNVOTE_COMMENT,
    payload: {
      threadId,
      commentId,
      userId,
    },
  };
}

function neutralVoteCommentActionCreator({ threadId, commentId, userId }) {
  return {
    type: ActionType.NEUTRAL_VOTE_COMMENT,
    payload: {
      threadId,
      commentId,
      userId,
    },
  };
}

function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const comment = await api.createComment(threadId, content);
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncToggleUpvoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState().auth;

    if (!authUser) {
      alert('Please login to vote');
      return;
    }

    dispatch(
      toggleUpvoteCommentActionCreator({
        threadId,
        commentId,
        userId: authUser.id,
      })
    );

    try {
      await api.upvoteComment(threadId, commentId);
    } catch (error) {
      alert(error.message);
      dispatch(
        toggleUpvoteCommentActionCreator({
          threadId,
          commentId,
          userId: authUser.id,
        })
      );
    }
  };
}

function asyncToggleDownvoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState().auth;

    if (!authUser) {
      alert('Please login to vote');
      return;
    }

    dispatch(
      toggleDownvoteCommentActionCreator({
        threadId,
        commentId,
        userId: authUser.id,
      })
    );

    try {
      await api.downvoteComment(threadId, commentId);
    } catch (error) {
      alert(error.message);
      dispatch(
        toggleDownvoteCommentActionCreator({
          threadId,
          commentId,
          userId: authUser.id,
        })
      );
    }
  };
}

function asyncNeutralVoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState().auth;

    if (!authUser) {
      alert('Please login to vote');
      return;
    }

    dispatch(
      neutralVoteCommentActionCreator({
        threadId,
        commentId,
        userId: authUser.id,
      })
    );

    try {
      await api.neutralVoteComment(threadId, commentId);
    } catch (error) {
      alert(error.message);
      dispatch(
        neutralVoteCommentActionCreator({
          threadId,
          commentId,
          userId: authUser.id,
        })
      );
    }
  };
}

export {
  addCommentActionCreator,
  toggleUpvoteCommentActionCreator,
  toggleDownvoteCommentActionCreator,
  neutralVoteCommentActionCreator,
  asyncAddComment,
  asyncToggleUpvoteComment,
  asyncToggleDownvoteComment,
  asyncNeutralVoteComment,
};
