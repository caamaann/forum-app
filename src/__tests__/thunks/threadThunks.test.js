/**
 * Scenario:
 * - asyncGetAllThreads thunk:
 *   - should dispatch actions correctly when getting threads is successful
 *   - should dispatch actions correctly when getting threads fails
 * - asyncGetThreadDetail thunk:
 *   - should dispatch actions correctly when getting thread detail is successful
 *   - should dispatch actions correctly when getting thread detail fails
 * - asyncCreateThread thunk:
 *   - should dispatch actions correctly when creating thread is successful
 *   - should dispatch actions correctly when creating thread fails
 * - asyncToggleUpvoteThread thunk:
 *   - should dispatch actions correctly when toggling upvote is successful
 *   - should dispatch actions correctly when toggling upvote fails
 */

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import {
  asyncGetAllThreads,
  asyncGetThreadDetail,
  asyncCreateThread,
  asyncToggleUpvoteThread,
} from '../../states/actions/threadActions';
import { ActionType } from '../../states/actions/actionTypes';
import api from '../../utils/api';

// Mock the api module
jest.mock('../../utils/api');

describe('Thread thunk functions', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
  });

  describe('asyncGetAllThreads thunk', () => {
    it('should dispatch actions correctly when getting threads is successful', async () => {
      // Arrange
      const fakeThreads = [
        {
          id: 'thread-1',
          title: 'Thread 1',
          body: 'This is thread 1',
          category: 'general',
          createdAt: '2022-01-01T00:00:00.000Z',
          ownerId: 'user-1',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
        {
          id: 'thread-2',
          title: 'Thread 2',
          body: 'This is thread 2',
          category: 'help',
          createdAt: '2022-01-02T00:00:00.000Z',
          ownerId: 'user-2',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      ];

      const fakeUsers = [
        {
          id: 'user-1',
          name: 'User 1',
          email: 'user1@example.com',
          avatar: 'https://example.com/avatar1.jpg',
        },
        {
          id: 'user-2',
          name: 'User 2',
          email: 'user2@example.com',
          avatar: 'https://example.com/avatar2.jpg',
        },
      ];

      // Mock api functions
      api.getAllThreads.mockResolvedValue(fakeThreads);
      api.getAllUsers.mockResolvedValue(fakeUsers);

      // Mock dispatch function
      const dispatch = jest.fn();

      // Action
      await asyncGetAllThreads()(dispatch);

      // Assert
      expect(api.getAllThreads).toHaveBeenCalled();
      expect(api.getAllUsers).toHaveBeenCalled();

      // Verify dispatch calls
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionType.SET_IS_LOADING,
        payload: {
          isLoading: true,
        },
      });

      // Check that the threads were mapped with their owners
      const mappedThreads = fakeThreads.map((thread) => ({
        ...thread,
        owner: fakeUsers.find((user) => user.id === thread.ownerId),
      }));

      expect(dispatch).toHaveBeenCalledWith({
        type: ActionType.RECEIVE_THREADS,
        payload: {
          threads: mappedThreads,
        },
      });

      expect(dispatch).toHaveBeenCalledWith({
        type: ActionType.SET_IS_LOADING,
        payload: {
          isLoading: false,
        },
      });
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should dispatch actions correctly when getting threads fails', async () => {
      // Arrange
      const errorMessage = 'Failed to get threads';

      // Mock api functions
      api.getAllThreads.mockRejectedValue(new Error(errorMessage));

      // Mock dispatch function
      const dispatch = jest.fn();

      // Action
      await asyncGetAllThreads()(dispatch);

      // Assert
      expect(api.getAllThreads).toHaveBeenCalled();

      // Verify dispatch calls
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionType.SET_IS_LOADING,
        payload: {
          isLoading: true,
        },
      });
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionType.SET_ERROR,
        payload: {
          error: errorMessage,
        },
      });
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionType.SET_IS_LOADING,
        payload: {
          isLoading: false,
        },
      });
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });

  describe('asyncGetThreadDetail thunk', () => {
    it('should dispatch actions correctly when getting thread detail is successful', async () => {
      // Arrange
      const threadId = 'thread-1';
      const fakeThreadDetail = {
        id: threadId,
        title: 'Thread 1',
        body: 'This is thread 1',
        category: 'general',
        createdAt: '2022-01-01T00:00:00.000Z',
        owner: {
          id: 'user-1',
          name: 'User 1',
          avatar: 'https://example.com/avatar1.jpg',
        },
        upVotesBy: [],
        downVotesBy: [],
        comments: [],
      };

      // Mock api functions
      api.getThreadDetail.mockResolvedValue(fakeThreadDetail);

      // Mock dispatch function
      const dispatch = jest.fn();

      // Action
      await asyncGetThreadDetail(threadId)(dispatch);

      // Assert
      expect(api.getThreadDetail).toHaveBeenCalledWith(threadId);

      // Verify dispatch calls
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionType.SET_IS_LOADING,
        payload: {
          isLoading: true,
        },
      });
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionType.RECEIVE_THREAD_DETAIL,
        payload: {
          threadDetail: fakeThreadDetail,
        },
      });
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionType.SET_IS_LOADING,
        payload: {
          isLoading: false,
        },
      });
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should dispatch actions correctly when getting thread detail fails', async () => {
      // Arrange
      const threadId = 'thread-1';
      const errorMessage = 'Failed to get thread detail';

      // Mock api functions
      api.getThreadDetail.mockRejectedValue(new Error(errorMessage));

      // Mock dispatch function
      const dispatch = jest.fn();

      // Action
      await asyncGetThreadDetail(threadId)(dispatch);

      // Assert
      expect(api.getThreadDetail).toHaveBeenCalledWith(threadId);

      // Verify dispatch calls
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionType.SET_IS_LOADING,
        payload: {
          isLoading: true,
        },
      });
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionType.SET_ERROR,
        payload: {
          error: errorMessage,
        },
      });
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionType.SET_IS_LOADING,
        payload: {
          isLoading: false,
        },
      });
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });

  describe('asyncCreateThread thunk', () => {
    it('should dispatch actions correctly when creating thread is successful', async () => {
      // Arrange
      const threadData = {
        title: 'New Thread',
        body: 'This is a new thread',
        category: 'discussion',
      };
      const fakeThread = {
        id: 'thread-new',
        ...threadData,
        createdAt: '2022-01-03T00:00:00.000Z',
        ownerId: 'user-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      };

      // Mock api functions
      api.createThread.mockResolvedValue(fakeThread);

      // Mock dispatch function
      const dispatch = jest.fn();

      // Action
      const result = await asyncCreateThread(threadData)(dispatch);

      // Assert
      expect(api.createThread).toHaveBeenCalledWith(threadData);
      expect(result).toEqual(fakeThread);

      // Verify dispatch calls
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionType.ADD_THREAD,
        payload: {
          thread: fakeThread,
        },
      });
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should dispatch actions correctly when creating thread fails', async () => {
      // Arrange
      const threadData = {
        title: 'New Thread',
        body: 'This is a new thread',
        category: 'discussion',
      };
      const errorMessage = 'Failed to create thread';

      // Mock api functions
      api.createThread.mockRejectedValue(new Error(errorMessage));

      // Mock dispatch function
      const dispatch = jest.fn();

      // Action
      const result = await asyncCreateThread(threadData)(dispatch);

      // Assert
      expect(api.createThread).toHaveBeenCalledWith(threadData);
      expect(result).toBeNull();

      // Verify dispatch calls
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionType.SET_ERROR,
        payload: {
          error: errorMessage,
        },
      });
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });

  describe('asyncToggleUpvoteThread thunk', () => {
    it('should dispatch actions correctly when upvoting thread and user is authenticated', async () => {
      // Arrange
      const threadId = 'thread-1';
      const authUser = {
        id: 'user-1',
        name: 'User 1',
        email: 'user1@example.com',
      };

      // Mock getState function
      const getState = jest.fn(() => ({
        auth: {
          authUser,
        },
      }));

      // Mock api functions
      api.upvoteThread.mockResolvedValue({ votesType: 1 });

      // Mock dispatch function
      const dispatch = jest.fn();

      // Action
      await asyncToggleUpvoteThread(threadId)(dispatch, getState);

      // Assert
      expect(getState).toHaveBeenCalled();
      expect(api.upvoteThread).toHaveBeenCalledWith(threadId);

      // Verify dispatch calls - should have upvoted
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionType.TOGGLE_UPVOTE_THREAD,
        payload: {
          threadId,
          userId: authUser.id,
        },
      });
    });

    it('should alert when user is not authenticated', async () => {
      // Arrange
      const threadId = 'thread-1';

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
      await asyncToggleUpvoteThread(threadId)(dispatch, getState);

      // Assert
      expect(getState).toHaveBeenCalled();
      expect(api.upvoteThread).not.toHaveBeenCalled();
      expect(global.alert).toHaveBeenCalledWith('Please login to vote');
      expect(dispatch).not.toHaveBeenCalled();

      // Restore original alert
      global.alert = originalAlert;
    });

    it('should revert upvote when API call fails', async () => {
      // Arrange
      const threadId = 'thread-1';
      const authUser = {
        id: 'user-1',
        name: 'User 1',
        email: 'user1@example.com',
      };
      const errorMessage = 'Failed to upvote thread';

      // Mock getState function
      const getState = jest.fn(() => ({
        auth: {
          authUser,
        },
      }));

      // Mock api functions
      api.upvoteThread.mockRejectedValue(new Error(errorMessage));

      // Mock alert function
      const originalAlert = global.alert;
      global.alert = jest.fn();

      // Mock dispatch function
      const dispatch = jest.fn();

      // Action
      await asyncToggleUpvoteThread(threadId)(dispatch, getState);

      // Assert
      expect(getState).toHaveBeenCalled();
      expect(api.upvoteThread).toHaveBeenCalledWith(threadId);

      // Should have toggled upvote initially
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionType.TOGGLE_UPVOTE_THREAD,
        payload: {
          threadId,
          userId: authUser.id,
        },
      });

      // Should alert error
      expect(global.alert).toHaveBeenCalledWith(errorMessage);

      // Should have toggled again to revert
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionType.TOGGLE_UPVOTE_THREAD,
        payload: {
          threadId,
          userId: authUser.id,
        },
      });

      // Restore original alert
      global.alert = originalAlert;
    });
  });
});
