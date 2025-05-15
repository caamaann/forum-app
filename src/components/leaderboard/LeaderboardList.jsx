import React from 'react';
import PropTypes from 'prop-types';
import LeaderboardItem from './LeaderboardItem';
import LoadingIndicator from '../common/LoadingIndicator';
import { LeaderboardItemPropTypes } from '../../utils/types';

function LeaderboardList({ leaderboards, loading }) {
  if (loading) {
    return <LoadingIndicator />;
  }

  if (leaderboards.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">No leaderboard data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {leaderboards.map((leaderboard, index) => (
        <LeaderboardItem
          key={leaderboard.user?.id || index}
          user={leaderboard.user}
          rank={index + 1}
          score={leaderboard.score}
        />
      ))}
    </div>
  );
}

LeaderboardList.propTypes = {
  leaderboards: PropTypes.arrayOf(PropTypes.shape(LeaderboardItemPropTypes)).isRequired,
  loading: PropTypes.bool,
};

LeaderboardList.defaultProps = {
  loading: false,
};

export default LeaderboardList;
