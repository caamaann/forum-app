/**
 * Scenario:
 * - leaderboardActions thunk:
 *   - asyncGetLeaderboards thunk:
 *     - should dispatch actions correctly when getting leaderboards is successful
 *     - should dispatch actions correctly when getting leaderboards fails
 */

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { asyncGetLeaderboards } from '../../states/actions/leaderboardActions';
import { ActionType } from '../../states/actions/actionTypes';
import api from '../../utils/api';

// Mock the api module
jest.mock('../../utils/api');

describe('Leaderboard thunk functions', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
  });

  describe('asyncGetLeaderboards thunk', () => {
    it('should dispatch actions correctly when getting leaderboards is successful', async () => {
      // Arrange
      const fakeLeaderboards = [
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

      // Mock api functions
      api.getLeaderboard.mockResolvedValue(fakeLeaderboards);

      // Mock dispatch function
      const dispatch = jest.fn();

      // Action
      await asyncGetLeaderboards()(dispatch);

      // Assert
      expect(api.getLeaderboard).toHaveBeenCalled();

      // Verify dispatch calls
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionType.SET_LEADERBOARD_LOADING,
        payload: {
          isLoading: true,
        },
      });
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionType.RECEIVE_LEADERBOARDS,
        payload: {
          leaderboards: fakeLeaderboards,
        },
      });
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionType.SET_LEADERBOARD_LOADING,
        payload: {
          isLoading: false,
        },
      });
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should dispatch actions correctly when getting leaderboards fails', async () => {
      // Arrange
      const errorMessage = 'Failed to get leaderboards';

      // Mock api functions
      api.getLeaderboard.mockRejectedValue(new Error(errorMessage));

      // Mock dispatch function
      const dispatch = jest.fn();

      // Action
      await asyncGetLeaderboards()(dispatch);

      // Assert
      expect(api.getLeaderboard).toHaveBeenCalled();

      // Verify dispatch calls
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionType.SET_LEADERBOARD_LOADING,
        payload: {
          isLoading: true,
        },
      });
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionType.SET_LEADERBOARD_ERROR,
        payload: {
          error: errorMessage,
        },
      });
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionType.SET_LEADERBOARD_LOADING,
        payload: {
          isLoading: false,
        },
      });
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });
});
