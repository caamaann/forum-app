/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';
import {
  asyncToggleUpvoteThread,
  asyncToggleDownvoteThread,
  asyncNeutralVoteThread,
} from '../../states/actions/threadActions';
import { ThreadPropTypes } from '../../utils/types';

function ThreadItem({ thread }) {
  const { id, title, body, category, createdAt, totalComments, upVotesBy, downVotesBy, owner } =
    thread;
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

  const truncatedBody = body.length > 150 ? `${body.substring(0, 150)}...` : body;

  const formattedDate = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-shadow">
      <div className="flex mb-2">
        {category && (
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2">
            #{category}
          </span>
        )}
        <span className="text-gray-500 text-sm">{formattedDate}</span>
      </div>
      <Link to={`/threads/${id}`}>
        <h2 className="text-xl font-semibold text-gray-800 hover:text-blue-600 mb-2">{title}</h2>
      </Link>
      <p className="text-gray-600 mb-4" dangerouslySetInnerHTML={{ __html: truncatedBody }} />

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-gray-700">{owner?.name}</span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <button
              type="button"
              onClick={onUpVoteClick}
              className={`p-1 rounded-full ${isUpVoted ? 'text-blue-600' : 'text-gray-500'} hover:bg-gray-100`}
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
            </button>
            <span className="mx-1">{upVotesBy.length}</span>
          </div>

          <div className="flex items-center">
            <button
              type="button"
              onClick={onDownVoteClick}
              className={`p-1 rounded-full ${isDownVoted ? 'text-red-600' : 'text-gray-500'} hover:bg-gray-100`}
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
            </button>
            <span className="mx-1">{downVotesBy.length}</span>
          </div>

          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="mx-1">{totalComments}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

ThreadItem.propTypes = {
  thread: PropTypes.shape(ThreadPropTypes).isRequired,
};

export default ThreadItem;
