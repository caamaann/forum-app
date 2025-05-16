import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LeaderboardList from '../components/leaderboard/LeaderboardList';
import { asyncGetLeaderboards } from '../states/actions/leaderboardActions';

function LeaderboardPage() {
  const { leaderboards, isLoading, error } = useSelector((states) => states.leaderboard);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetLeaderboards());
  }, [dispatch]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Leaderboard</h1>
        <p className="text-gray-600">Top contributors in our community</p>
      </div>

      {error && (
        <div className="p-4 mb-6 text-center bg-red-50 text-red-700 rounded-md">
          {error}
          <button
            type="button"
            onClick={() => dispatch(asyncGetLeaderboards())}
            className="ml-2 underline"
          >
            Try Again
          </button>
        </div>
      )}

      <LeaderboardList leaderboards={leaderboards} loading={isLoading} />
    </div>
  );
}

export default LeaderboardPage;
