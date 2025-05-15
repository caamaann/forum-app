/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';
import {
  asyncToggleUpvoteComment,
  asyncToggleDownvoteComment,
  asyncNeutralVoteComment,
} from '../../states/actions/commentActions';
import { CommentPropTypes } from '../../utils/types';

function CommentItem({ comment, threadId }) {
  const { id, content, createdAt, upVotesBy, downVotesBy, owner } = comment;
  const { authUser } = useSelector((states) => states.auth);
  const dispatch = useDispatch();

  const isUpVoted = authUser && upVotesBy.includes(authUser.id);
  const isDownVoted = authUser && downVotesBy.includes(authUser.id);

  const onUpVoteClick = () => {
    if (isUpVoted) {
      dispatch(asyncNeutralVoteComment({ threadId, commentId: id }));
    } else {
      dispatch(asyncToggleUpvoteComment({ threadId, commentId: id }));
    }
  };

  const onDownVoteClick = () => {
    if (isDownVoted) {
      dispatch(asyncNeutralVoteComment({ threadId, commentId: id }));
    } else {
      dispatch(asyncToggleDownvoteComment({ threadId, commentId: id }));
    }
  };

  const formattedDate = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

  return (
    <div className="border-b border-gray-200 py-4">
      <div className="flex items-start space-x-3">
        <img
          src={owner.avatar || `https://ui-avatars.com/api/?name=${owner.name}`}
          alt={owner.name}
          className="w-10 h-10 rounded-full mt-1"
        />
        <div className="flex-1">
          <div className="flex items-center mb-1">
            <h4 className="font-medium text-gray-900 mr-2">{owner.name}</h4>
            <span className="text-sm text-gray-500">{formattedDate}</span>
          </div>
          <div className="prose-sm" dangerouslySetInnerHTML={{ __html: content }} />
          <div className="flex items-center mt-2 space-x-4">
            <button
              type="button"
              onClick={onUpVoteClick}
              className={`flex items-center text-sm rounded-full px-2 py-1 ${
                isUpVoted ? 'text-blue-600' : 'text-gray-500 hover:bg-gray-100'
              }`}
              aria-label="Upvote"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{upVotesBy.length}</span>
            </button>
            <button
              type="button"
              onClick={onDownVoteClick}
              className={`flex items-center text-sm rounded-full px-2 py-1 ${
                isDownVoted ? 'text-red-600' : 'text-gray-500 hover:bg-gray-100'
              }`}
              aria-label="Downvote"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{downVotesBy.length}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.shape(CommentPropTypes).isRequired,
  threadId: PropTypes.string.isRequired,
};

export default CommentItem;
