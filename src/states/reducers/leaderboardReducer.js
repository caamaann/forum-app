import { ActionType } from '../actions/actionTypes';

const initialState = {
  leaderboards: [],
  isLoading: false,
  error: null,
};

function leaderboardReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_LEADERBOARDS:
      return {
        ...state,
        leaderboards: action.payload.leaderboards,
      };
    case ActionType.SET_LEADERBOARD_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    case ActionType.SET_LEADERBOARD_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
}

export default leaderboardReducer;
