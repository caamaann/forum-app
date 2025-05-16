import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ThreadDetail from '../components/thread/ThreadDetail';
import CommentList from '../components/comment/CommentList';
import CommentInput from '../components/comment/CommentInput';
import LoadingIndicator from '../components/common/LoadingIndicator';
import { asyncGetThreadDetail } from '../states/actions/threadActions';

function ThreadDetailPage() {
  const { id } = useParams();
  const { threadDetail, isLoading, error } = useSelector((states) => states.threads);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetThreadDetail(id));
  }, [id, dispatch]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <div className="text-red-600 mb-4">{error}</div>
        <div className="flex justify-center space-x-4">
          <button
            type="button"
            onClick={() => dispatch(asyncGetThreadDetail(id))}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Try Again
          </button>
          <Link to="/" className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!threadDetail) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/" className="inline-flex items-center text-blue-600 mb-6 hover:underline">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Threads
      </Link>

      <ThreadDetail thread={threadDetail} />

      <div className="mt-8">
        <CommentInput threadId={id} />
        <CommentList comments={threadDetail.comments} threadId={id} />
      </div>
    </div>
  );
}

export default ThreadDetailPage;
