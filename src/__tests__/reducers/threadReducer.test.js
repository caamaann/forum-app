/**
 * Scenario:
 * - Thread reducer function should:
 *   - return the initial state when given unknown action
 *   - receive threads correctly when given RECEIVE_THREADS action
 *   - add thread correctly when given ADD_THREAD action
 *   - receive thread detail correctly when given RECEIVE_THREAD_DETAIL action
 *   - toggle thread upvote correctly when given TOGGLE_UPVOTE_THREAD action
 *   - toggle thread downvote correctly when given TOGGLE_DOWNVOTE_THREAD action
 *   - set filter category correctly when given SET_FILTER_CATEGORY action
 */

import threadsReducer from '../../states/reducers/threadReducer';
import { ActionType } from '../../states/actions/actionTypes';

describe('threadsReducer function', () => {
  it('should return the initial state when given unknown action', () => {
    // Arrange
    const initialState = {
      threads: [],
      threadDetail: null,
      categories: [],
      filteredCategory: '',
      isLoading: false,
      error: null,
    };
    const action = { type: 'UNKNOWN_ACTION' };

    // Action
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should receive threads correctly when given RECEIVE_THREADS action', () => {
    // Arrange
    const initialState = {
      threads: [],
      threadDetail: null,
      categories: [],
      filteredCategory: '',
      isLoading: false,
      error: null,
    };
    const threads = [
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
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: {
        threads,
      },
    };

    // Action
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual({
      ...initialState,
      threads,
      categories: ['general', 'help'],
    });
  });

  it('should add thread correctly when given ADD_THREAD action', () => {
    // Arrange
    const initialState = {
      threads: [
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
      ],
      threadDetail: null,
      categories: ['general'],
      filteredCategory: '',
      isLoading: false,
      error: null,
    };
    const newThread = {
      id: 'thread-2',
      title: 'Thread 2',
      body: 'This is thread 2',
      category: 'help',
      createdAt: '2022-01-02T00:00:00.000Z',
      ownerId: 'user-2',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    };
    const action = {
      type: ActionType.ADD_THREAD,
      payload: {
        thread: newThread,
      },
    };

    // Action
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState.threads).toHaveLength(2);
    expect(nextState.threads[0]).toEqual(newThread); // New thread should be at the beginning
    expect(nextState.categories).toEqual(['help', 'general']);
  });

  it('should toggle thread upvote correctly when given TOGGLE_UPVOTE_THREAD action', () => {
    // Arrange
    const initialState = {
      threads: [
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
      ],
      threadDetail: {
        id: 'thread-1',
        title: 'Thread 1',
        body: 'This is thread 1',
        category: 'general',
        createdAt: '2022-01-01T00:00:00.000Z',
        owner: {
          id: 'user-1',
          name: 'User 1',
          avatar: 'https://example.com/avatar.jpg',
        },
        upVotesBy: [],
        downVotesBy: [],
        comments: [],
      },
      categories: ['general'],
      filteredCategory: '',
      isLoading: false,
      error: null,
    };

    const userId = 'user-2';
    const action = {
      type: ActionType.TOGGLE_UPVOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId,
      },
    };

    // Action: First toggle (upvote)
    const afterUpvoteState = threadsReducer(initialState, action);

    // Assert after upvote
    expect(afterUpvoteState.threads[0].upVotesBy).toContain(userId);
    expect(afterUpvoteState.threads[0].downVotesBy).not.toContain(userId);
    expect(afterUpvoteState.threadDetail.upVotesBy).toContain(userId);
    expect(afterUpvoteState.threadDetail.downVotesBy).not.toContain(userId);

    // Action: Second toggle (remove upvote)
    const afterRemoveUpvoteState = threadsReducer(afterUpvoteState, action);

    // Assert after removing upvote
    expect(afterRemoveUpvoteState.threads[0].upVotesBy).not.toContain(userId);
    expect(afterRemoveUpvoteState.threadDetail.upVotesBy).not.toContain(userId);
  });

  it('should set filter category correctly when given SET_FILTER_CATEGORY action', () => {
    // Arrange
    const initialState = {
      threads: [],
      threadDetail: null,
      categories: ['general', 'help', 'discussion'],
      filteredCategory: '',
      isLoading: false,
      error: null,
    };
    const category = 'help';
    const action = {
      type: ActionType.SET_FILTER_CATEGORY,
      payload: {
        category,
      },
    };

    // Action
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState.filteredCategory).toEqual(category);
  });
});
