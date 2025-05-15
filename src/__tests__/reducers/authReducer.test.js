/**
 * Scenario:
 * - Auth reducer function should:
 *   - return the initial state when given unknown action
 *   - set auth user when given SET_AUTH_USER action
 *   - unset auth user when given UNSET_AUTH_USER action
 *   - set auth error when given SET_AUTH_ERROR action
 *   - clear auth error when given CLEAR_AUTH_ERROR action
 */

import authReducer from '../../states/reducers/authReducer';
import { ActionType } from '../../states/actions/actionTypes';

describe('authReducer function', () => {
  it('should return the initial state when given unknown action', () => {
    // Arrange
    const initialState = {
      authUser: null,
      isAuthenticated: false,
      isAuthError: false,
      authErrorMessage: '',
    };
    const action = { type: 'UNKNOWN_ACTION' };

    // Action
    const nextState = authReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should set auth user correctly when given SET_AUTH_USER action', () => {
    // Arrange
    const initialState = {
      authUser: null,
      isAuthenticated: false,
      isAuthError: false,
      authErrorMessage: '',
    };
    const user = {
      id: 'user-123',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://example.com/avatar.jpg',
    };
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: user,
    };

    // Action
    const nextState = authReducer(initialState, action);

    // Assert
    expect(nextState).toEqual({
      authUser: user,
      isAuthenticated: true,
      isAuthError: false,
      authErrorMessage: '',
    });
  });

  it('should unset auth user correctly when given UNSET_AUTH_USER action', () => {
    // Arrange
    const initialState = {
      authUser: {
        id: 'user-123',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://example.com/avatar.jpg',
      },
      isAuthenticated: true,
      isAuthError: false,
      authErrorMessage: '',
    };
    const action = {
      type: ActionType.UNSET_AUTH_USER,
    };

    // Action
    const nextState = authReducer(initialState, action);

    // Assert
    expect(nextState).toEqual({
      authUser: null,
      isAuthenticated: false,
      isAuthError: false,
      authErrorMessage: '',
    });
  });

  it('should set auth error correctly when given SET_AUTH_ERROR action', () => {
    // Arrange
    const initialState = {
      authUser: null,
      isAuthenticated: false,
      isAuthError: false,
      authErrorMessage: '',
    };
    const errorMessage = 'Invalid email or password';
    const action = {
      type: ActionType.SET_AUTH_ERROR,
      payload: errorMessage,
    };

    // Action
    const nextState = authReducer(initialState, action);

    // Assert
    expect(nextState).toEqual({
      authUser: null,
      isAuthenticated: false,
      isAuthError: true,
      authErrorMessage: errorMessage,
    });
  });

  it('should clear auth error correctly when given CLEAR_AUTH_ERROR action', () => {
    // Arrange
    const initialState = {
      authUser: null,
      isAuthenticated: false,
      isAuthError: true,
      authErrorMessage: 'Invalid email or password',
    };
    const action = {
      type: ActionType.CLEAR_AUTH_ERROR,
    };

    // Action
    const nextState = authReducer(initialState, action);

    // Assert
    expect(nextState).toEqual({
      authUser: null,
      isAuthenticated: false,
      isAuthError: false,
      authErrorMessage: '',
    });
  });
});
