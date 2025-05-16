/**
 * Scenario:
 * - userReducer function should:
 *   - return the initial state when given unknown action
 *   - receive users correctly when given RECEIVE_USERS action
 *   - set users loading state correctly when given SET_USERS_LOADING action
 *   - set users error correctly when given SET_USERS_ERROR action
 */

import userReducer from '../../states/reducers/userReducer';
import { ActionType } from '../../states/actions/actionTypes';

describe('userReducer function', () => {
  it('should return the initial state when given unknown action', () => {
    // Arrange
    const initialState = {
      users: [],
      isLoading: false,
      error: null,
    };
    const action = { type: 'UNKNOWN_ACTION' };

    // Action
    const nextState = userReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should receive users correctly when given RECEIVE_USERS action', () => {
    // Arrange
    const initialState = {
      users: [],
      isLoading: false,
      error: null,
    };
    const users = [
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
    const action = {
      type: ActionType.RECEIVE_USERS,
      payload: {
        users,
      },
    };

    // Action
    const nextState = userReducer(initialState, action);

    // Assert
    expect(nextState).toEqual({
      ...initialState,
      users,
    });
  });

  it('should set users loading state correctly when given SET_USERS_LOADING action', () => {
    // Arrange
    const initialState = {
      users: [],
      isLoading: false,
      error: null,
    };
    const action = {
      type: ActionType.SET_USERS_LOADING,
      payload: {
        isLoading: true,
      },
    };

    // Action
    const nextState = userReducer(initialState, action);

    // Assert
    expect(nextState).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should set users error correctly when given SET_USERS_ERROR action', () => {
    // Arrange
    const initialState = {
      users: [],
      isLoading: false,
      error: null,
    };
    const errorMessage = 'Failed to fetch users data';
    const action = {
      type: ActionType.SET_USERS_ERROR,
      payload: {
        error: errorMessage,
      },
    };

    // Action
    const nextState = userReducer(initialState, action);

    // Assert
    expect(nextState).toEqual({
      ...initialState,
      error: errorMessage,
    });
  });
});
