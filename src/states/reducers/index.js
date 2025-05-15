import authReducer from './authReducer';
import threadsReducer from './threadReducer';
import usersReducer from './userReducer';
import leaderboardReducer from './leaderboardReducer';

const rootReducer = {
  auth: authReducer,
  threads: threadsReducer,
  users: usersReducer,
  leaderboard: leaderboardReducer,
};

export default rootReducer;
