/**
 * Scenario:
 * - asyncLogin thunk:
 *   - should dispatch actions correctly when login is successful
 *   - should dispatch actions correctly when login fails
 * - asyncRegister thunk:
 *   - should dispatch actions correctly when register is successful
 *   - should dispatch actions correctly when register fails
 * - asyncPreloadUser thunk:
 *   - should dispatch actions correctly when preload user is successful
 *   - should dispatch actions correctly when preload user fails
 */

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { asyncLogin, asyncRegister, asyncPreloadUser } from '../../states/actions/authActions';
import { ActionType } from '../../states/actions/actionTypes';
import api from '../../utils/api';

// Mock the api module
jest.mock('../../utils/api');

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Auth thunk functions', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    localStorageMock.clear();
  });

  describe('asyncLogin thunk', () => {
    it('should dispatch actions correctly when login is successful', async () => {
      // Arrange
      const fakeToken = 'fake-token';
      const fakeUser = {
        id: 'user-123',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://example.com/avatar.jpg',
      };
      const loginArgs = { email: 'john@example.com', password: 'password123' };

      // Mock api functions
      api.login.mockResolvedValue(fakeToken);
      api.getOwnProfile.mockResolvedValue(fakeUser);

      // Mock dispatch function
      const dispatch = jest.fn();

      // Action
      const result = await asyncLogin(loginArgs)(dispatch);

      // Assert
      expect(result).toBe(true);
      expect(api.login).toHaveBeenCalledWith(loginArgs);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('accessToken', fakeToken);
      expect(api.getOwnProfile).toHaveBeenCalled();

      // Verify dispatch calls
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionType.SET_AUTH_USER,
        payload: fakeUser,
      });
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(dispatch).toHaveBeenCalledTimes(3);
    });

    it('should dispatch actions correctly when login fails', async () => {
      // Arrange
      const errorMessage = 'Invalid email or password';
      const loginArgs = { email: 'wrong@example.com', password: 'wrongpassword' };

      // Mock api functions
      api.login.mockRejectedValue(new Error(errorMessage));

      // Mock dispatch function
      const dispatch = jest.fn();

      // Action
      const result = await asyncLogin(loginArgs)(dispatch);

      // Assert
      expect(result).toBe(false);
      expect(api.login).toHaveBeenCalledWith(loginArgs);
      expect(localStorageMock.setItem).not.toHaveBeenCalled();
      expect(api.getOwnProfile).not.toHaveBeenCalled();

      // Verify dispatch calls
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionType.SET_AUTH_ERROR,
        payload: errorMessage,
      });
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(dispatch).toHaveBeenCalledTimes(3);
    });
  });

  describe('asyncRegister thunk', () => {
    it('should dispatch actions correctly when register is successful', async () => {
      // Arrange
      const registerArgs = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };

      // Mock api functions
      api.register.mockResolvedValue({
        id: 'user-123',
        name: 'John Doe',
        email: 'john@example.com',
      });

      // Mock dispatch function
      const dispatch = jest.fn();

      // Action
      const result = await asyncRegister(registerArgs)(dispatch);

      // Assert
      expect(result).toBe(true);
      expect(api.register).toHaveBeenCalledWith(registerArgs);

      // Verify dispatch calls
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(dispatch).toHaveBeenCalledTimes(2);
    });

    it('should dispatch actions correctly when register fails', async () => {
      // Arrange
      const errorMessage = 'Email is already taken';
      const registerArgs = {
        name: 'John Doe',
        email: 'existing@example.com',
        password: 'password123',
      };

      // Mock api functions
      api.register.mockRejectedValue(new Error(errorMessage));

      // Mock dispatch function
      const dispatch = jest.fn();

      // Action
      const result = await asyncRegister(registerArgs)(dispatch);

      // Assert
      expect(result).toBe(false);
      expect(api.register).toHaveBeenCalledWith(registerArgs);

      // Verify dispatch calls
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionType.SET_AUTH_ERROR,
        payload: errorMessage,
      });
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(dispatch).toHaveBeenCalledTimes(3);
    });
  });

  describe('asyncPreloadUser thunk', () => {
    it('should dispatch actions correctly when preload user is successful', async () => {
      // Arrange
      const fakeUser = {
        id: 'user-123',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://example.com/avatar.jpg',
      };

      // Mock api functions
      api.getOwnProfile.mockResolvedValue(fakeUser);

      // Mock dispatch function
      const dispatch = jest.fn();

      // Action
      await asyncPreloadUser()(dispatch);

      // Assert
      expect(api.getOwnProfile).toHaveBeenCalled();

      // Verify dispatch calls
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionType.SET_AUTH_USER,
        payload: fakeUser,
      });
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(dispatch).toHaveBeenCalledTimes(3);
    });

    it('should dispatch actions correctly when preload user fails', async () => {
      // Arrange
      const errorMessage = 'Failed to get user profile';

      // Mock api functions
      api.getOwnProfile.mockRejectedValue(new Error(errorMessage));

      // Mock dispatch function
      const dispatch = jest.fn();

      // Action
      await asyncPreloadUser()(dispatch);

      // Assert
      expect(api.getOwnProfile).toHaveBeenCalled();
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('accessToken');

      // Verify dispatch calls
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionType.UNSET_AUTH_USER,
      });
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(dispatch).toHaveBeenCalledTimes(3);
    });
  });
});
