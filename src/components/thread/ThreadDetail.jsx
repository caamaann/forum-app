/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';
import {
  asyncToggleUpvoteThread,
  asyncToggleDownvoteThread,
  asyncNeutralVoteThread,
} from '../../states/actions/threadActions';
import { LeaderboardItemPropTypes } from '../../utils/types';

function ThreadDetail({ thread }) {
  const { id, title, body, category, createdAt, upVotesBy, downVotesBy, owner } = thread;
  const { authUser } = useSelector((states) => states.auth);
  const dispatch = useDispatch();

  const isUpVoted = authUser && upVotesBy.includes(authUser.id);
  const isDownVoted = authUser && downVotesBy.includes(authUser.id);

  const onUpVoteClick = () => {
    if (isUpVoted) {
      dispatch(asyncNeutralVoteThread(id));
    } else {
      dispatch(asyncToggleUpvoteThread(id));
    }
  };

  const onDownVoteClick = () => {
    if (isDownVoted) {
      dispatch(asyncNeutralVoteThread(id));
    } else {
      dispatch(asyncToggleDownvoteThread(id));
    }
  };

  const formattedDate = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <div className="flex items-center mt-2">
            {category && (
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2">
                #{category}
              </span>
            )}
            <span className="text-gray-500 text-sm">{formattedDate}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={onUpVoteClick}
            className={`p-2 rounded-full flex items-center ${isUpVoted ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:bg-gray-100'}`}
            aria-label="Upvote"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-1">{upVotesBy.length}</span>
          </button>
          <button
            type="button"
            onClick={onDownVoteClick}
            className={`p-2 rounded-full flex items-center ${isDownVoted ? 'text-red-600 bg-red-50' : 'text-gray-500 hover:bg-gray-100'}`}
            aria-label="Downvote"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-1">{downVotesBy.length}</span>
          </button>
        </div>
      </div>

      <div className="flex items-center mb-6 p-3 bg-gray-50 rounded-lg">
        <img
          src={owner.avatar || `https://ui-avatars.com/api/?name=${owner.name}`}
          alt={owner.name}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <p className="font-medium text-gray-900">{owner.name}</p>
        </div>
      </div>

      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  );
}

ThreadDetail.propTypes = {
  thread: PropTypes.shape(LeaderboardItemPropTypes).isRequired,
};

export default ThreadDetail;
