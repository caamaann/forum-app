import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ThreadList from '../components/thread/ThreadList';
import CategoryFilter from '../components/thread/CategoryFilter';
import { asyncGetAllThreads } from '../states/actions/threadActions';

function HomePage() {
  const { threads, categories, filteredCategory, isLoading, error } = useSelector(
    (states) => states.threads
  );
  const { isAuthenticated } = useSelector((states) => states.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetAllThreads());
  }, [dispatch]);

  const filteredThreads = useMemo(
    () =>
      filteredCategory ? threads.filter((thread) => thread.category === filteredCategory) : threads,
    [filteredCategory, threads]
  );

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="text-red-600 mb-4">{error}</div>
        <button
          type="button"
          onClick={() => dispatch(asyncGetAllThreads())}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Discussion Threads</h1>
          <p className="text-gray-600">Join the conversation on various topics</p>
        </div>

        {isAuthenticated && (
          <Link
            to="/create"
            className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors inline-flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            New Thread
          </Link>
        )}
      </div>

      {categories.length > 0 && (
        <CategoryFilter categories={categories} activeCategory={filteredCategory} />
      )}

      <ThreadList threads={filteredThreads} loading={isLoading} />
    </div>
  );
}

export default HomePage;
