/**
 * Scenario:
 * - Leaderboard reducer function should:
 *   - return the initial state when given unknown action
 *   - receive leaderboards correctly when given RECEIVE_LEADERBOARDS action
 *   - set leaderboard loading state correctly when given SET_LEADERBOARD_LOADING action
 *   - set leaderboard error correctly when given SET_LEADERBOARD_ERROR action
 */

import leaderboardReducer from '../../states/reducers/leaderboardReducer';
import { ActionType } from '../../states/actions/actionTypes';

describe('leaderboardReducer function', () => {
  it('should return the initial state when given unknown action', () => {
    // Arrange
    const initialState = {
      leaderboards: [],
      isLoading: false,
      error: null,
    };
    const action = { type: 'UNKNOWN_ACTION' };

    // Action
    const nextState = leaderboardReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should receive leaderboards correctly when given RECEIVE_LEADERBOARDS action', () => {
    // Arrange
    const initialState = {
      leaderboards: [],
      isLoading: false,
      error: null,
    };
    const leaderboards = [
      {
        user: {
          id: 'user-1',
          name: 'User 1',
          email: 'user1@example.com',
          avatar: 'https://example.com/avatar1.jpg',
        },
        score: 100,
      },
      {
        user: {
          id: 'user-2',
          name: 'User 2',
          email: 'user2@example.com',
          avatar: 'https://example.com/avatar2.jpg',
        },
        score: 80,
      },
    ];
    const action = {
      type: ActionType.RECEIVE_LEADERBOARDS,
      payload: {
        leaderboards,
      },
    };

    // Action
    const nextState = leaderboardReducer(initialState, action);

    // Assert
    expect(nextState).toEqual({
      ...initialState,
      leaderboards,
    });
  });

  it('should set leaderboard loading state correctly when given SET_LEADERBOARD_LOADING action', () => {
    // Arrange
    const initialState = {
      leaderboards: [],
      isLoading: false,
      error: null,
    };
    const action = {
      type: ActionType.SET_LEADERBOARD_LOADING,
      payload: {
        isLoading: true,
      },
    };

    // Action
    const nextState = leaderboardReducer(initialState, action);

    // Assert
    expect(nextState).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should set leaderboard error correctly when given SET_LEADERBOARD_ERROR action', () => {
    // Arrange
    const initialState = {
      leaderboards: [],
      isLoading: false,
      error: null,
    };
    const errorMessage = 'Failed to fetch leaderboard data';
    const action = {
      type: ActionType.SET_LEADERBOARD_ERROR,
      payload: {
        error: errorMessage,
      },
    };

    // Action
    const nextState = leaderboardReducer(initialState, action);

    // Assert
    expect(nextState).toEqual({
      ...initialState,
      error: errorMessage,
    });
  });
});
