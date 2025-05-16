/**
 * Scenario:
 * - commentActions thunk:
 *   - asyncAddComment thunk:
 *     - should dispatch actions correctly when adding comment is successful
 *     - should alert when adding comment fails
 *   - asyncToggleUpvoteComment thunk:
 *     - should dispatch actions correctly when upvoting comment is successful
 *     - should alert when user is not authenticated
 *     - should revert upvote when API call fails
 */

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import {
  asyncAddComment,
  asyncToggleUpvoteComment,
  asyncToggleDownvoteComment,
} from '../../states/actions/commentActions';
import { ActionType } from '../../states/actions/actionTypes';
import api from '../../utils/api';

// Mock the api module
jest.mock('../../utils/api');

describe('Comment thunk functions', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
  });

  describe('asyncAddComment thunk', () => {
    it('should dispatch actions correctly when adding comment is successful', async () => {
      // Arrange
      const threadId = 'thread-1';
      const content = 'This is a comment';
      const fakeComment = {
        id: 'comment-1',
        content,
        createdAt: '2022-01-01T00:00:00.000Z',
        owner: {
          id: 'user-1',
          name: 'User 1',
          avatar: 'https://example.com/avatar1.jpg',
        },
        upVotesBy: [],
        downVotesBy: [],
      };

      // Mock api functions
      api.createComment.mockResolvedValue(fakeComment);

      // Mock dispatch function
      const dispatch = jest.fn();

      // Action
      await asyncAddComment({ threadId, content })(dispatch);

      // Assert
      expect(api.createComment).toHaveBeenCalledWith(threadId, content);

      // Verify dispatch calls
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionType.ADD_COMMENT,
        payload: {
          comment: fakeComment,
        },
      });
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should alert when adding comment fails', async () => {
      // Arrange
      const threadId = 'thread-1';
      const content = 'This is a comment';
      const errorMessage = 'Failed to add comment';

      // Mock api functions
      api.createComment.mockRejectedValue(new Error(errorMessage));

      // Mock alert function
      const originalAlert = global.alert;
      global.alert = jest.fn();

      // Mock dispatch function
      const dispatch = jest.fn();

      // Action
      await asyncAddComment({ threadId, content })(dispatch);

      // Assert
      expect(api.createComment).toHaveBeenCalledWith(threadId, content);
      expect(global.alert).toHaveBeenCalledWith(errorMessage);

      // Verify dispatch calls
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).not.toHaveBeenCalledWith({
        type: ActionType.ADD_COMMENT,
        payload: expect.any(Object),
      });
      expect(dispatch).toHaveBeenCalledWith(hideLoading());

      // Restore original alert
      global.alert = originalAlert;
    });
  });

  describe('asyncToggleUpvoteComment thunk', () => {
    it('should dispatch actions correctly when upvoting comment is successful', async () => {
      // Arrange
      const threadId = 'thread-1';
      const commentId = 'comment-1';
      const authUser = {
        id: 'user-1',
        name: 'User 1',
      };

      // Mock getState function
      const getState = jest.fn(() => ({
        auth: {
          authUser,
        },
      }));

      // Mock api functions
      api.upvoteComment.mockResolvedValue({ votesType: 1 });

      // Mock dispatch function
      const dispatch = jest.fn();

      // Action
      await asyncToggleUpvoteComment({ threadId, commentId })(dispatch, getState);

      // Assert
      expect(getState).toHaveBeenCalled();
      expect(api.upvoteComment).toHaveBeenCalledWith(threadId, commentId);

      // Verify dispatch calls
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionType.TOGGLE_UPVOTE_COMMENT,
        payload: {
          threadId,
          commentId,
          userId: authUser.id,
        },
      });
    });

    it('should alert when user is not authenticated', async () => {
      // Arrange
      const threadId = 'thread-1';
      const commentId = 'comment-1';

      // Mock getState function
      const getState = jest.fn(() => ({
        auth: {
          authUser: null,
        },
      }));

      // Mock alert function
      const originalAlert = global.alert;
      global.alert = jest.fn();

      // Mock dispatch function
      const dispatch = jest.fn();

      // Action
      await asyncToggleUpvoteComment({ threadId, commentId })(dispatch, getState);

      // Assert
      expect(getState).toHaveBeenCalled();
      expect(api.upvoteComment).not.toHaveBeenCalled();
      expect(global.alert).toHaveBeenCalledWith('Please login to vote');
      expect(dispatch).not.toHaveBeenCalled();

      // Restore original alert
      global.alert = originalAlert;
    });

    it('should revert upvote when API call fails', async () => {
      // Arrange
      const threadId = 'thread-1';
      const commentId = 'comment-1';
      const authUser = {
        id: 'user-1',
        name: 'User 1',
      };
      const errorMessage = 'Failed to upvote comment';

      // Mock getState function
      const getState = jest.fn(() => ({
        auth: {
          authUser,
        },
      }));

      // Mock api functions
      api.upvoteComment.mockRejectedValue(new Error(errorMessage));

      // Mock alert function
      const originalAlert = global.alert;
      global.alert = jest.fn();

      // Mock dispatch function
      const dispatch = jest.fn();

      // Action
      await asyncToggleUpvoteComment({ threadId, commentId })(dispatch, getState);

      // Assert
      expect(getState).toHaveBeenCalled();
      expect(api.upvoteComment).toHaveBeenCalledWith(threadId, commentId);

      // Should have toggled upvote initially
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionType.TOGGLE_UPVOTE_COMMENT,
        payload: {
          threadId,
          commentId,
          userId: authUser.id,
        },
      });

      // Should alert error
      expect(global.alert).toHaveBeenCalledWith(errorMessage);

      // Should have toggled again to revert
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionType.TOGGLE_UPVOTE_COMMENT,
        payload: {
          threadId,
          commentId,
          userId: authUser.id,
        },
      });

      // Restore original alert
      global.alert = originalAlert;
    });
  });

  describe('asyncToggleDownvoteComment thunk', () => {
    it('should dispatch actions correctly when downvoting comment is successful', async () => {
      // Arrange
      const threadId = 'thread-1';
      const commentId = 'comment-1';
      const authUser = {
        id: 'user-1',
        name: 'User 1',
      };

      // Mock getState function
      const getState = jest.fn(() => ({
        auth: {
          authUser,
        },
      }));

      // Mock api functions
      api.downvoteComment.mockResolvedValue({ votesType: -1 });

      // Mock dispatch function
      const dispatch = jest.fn();

      // Action
      await asyncToggleDownvoteComment({ threadId, commentId })(dispatch, getState);

      // Assert
      expect(getState).toHaveBeenCalled();
      expect(api.downvoteComment).toHaveBeenCalledWith(threadId, commentId);

      // Verify dispatch calls
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionType.TOGGLE_DOWNVOTE_COMMENT,
        payload: {
          threadId,
          commentId,
          userId: authUser.id,
        },
      });
    });
  });
});
