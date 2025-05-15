import React from 'react';
import { LeaderboardItemPropTypes } from '../../utils/types';

function LeaderboardItem({ user, rank, score }) {
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex-shrink-0 mr-4 text-xl font-bold text-gray-500 w-6 text-center">
        {rank}
      </div>
      <div className="flex-shrink-0 mr-4">
        <img
          src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`}
          alt={user.name}
          className="h-12 w-12 rounded-full"
        />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-medium">{user.name}</h3>
      </div>
      <div className="font-medium text-blue-600">{score} points</div>
    </div>
  );
}

LeaderboardItem.propTypes = LeaderboardItemPropTypes;

export default LeaderboardItem;
