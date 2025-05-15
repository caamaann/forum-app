/**
 * Scenario:
 * - LoginInput component:
 *   - should render login form correctly
 *   - should update email input value when user types
 *   - should update password input value when user types
 *   - should call asyncLogin when form is submitted
 *   - should show error message when login fails
 *   - should navigate to home page when login succeeds
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import LoginInput from '../../components/auth/LoginInput';
import { asyncLogin, clearAuthErrorActionCreator } from '../../states/actions/authActions';

// Mock React Router
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

// Mock Redux Actions
jest.mock('../../states/actions/authActions');

// Create mock store
const createMockStore = (isAuthError = false, authErrorMessage = '') =>
  configureStore({
    reducer: {
      auth: () => ({
        isAuthError,
        authErrorMessage,
      }),
    },
  });

// Mock component wrapper
const renderWithProviders = (ui, { store = createMockStore(), ...renderOptions } = {}) => {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

describe('LoginInput component', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    mockedNavigate.mockReset();
  });

  it('should render login form correctly', () => {
    // Arrange & Action
    renderWithProviders(<LoginInput />);

    // Assert
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByText(/Don't have an account/i)).toBeInTheDocument();
    expect(screen.getByText(/Register here/i)).toBeInTheDocument();
  });

  it('should update email input value when user types', () => {
    // Arrange
    renderWithProviders(<LoginInput />);
    const emailInput = screen.getByLabelText(/Email/i);

    // Action
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    // Assert
    expect(emailInput.value).toBe('test@example.com');
  });

  it('should update password input value when user types', () => {
    // Arrange
    renderWithProviders(<LoginInput />);
    const passwordInput = screen.getByLabelText(/Password/i);

    // Action
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Assert
    expect(passwordInput.value).toBe('password123');
  });

  it('should call asyncLogin when form is submitted', async () => {
    // Arrange
    asyncLogin.mockImplementation(() => () => Promise.resolve(false));
    renderWithProviders(<LoginInput />);

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    // Action
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    // Assert
    await waitFor(() => {
      expect(asyncLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('should not navigate when login fails', async () => {
    // Arrange
    asyncLogin.mockImplementation(() => () => Promise.resolve(false));
    renderWithProviders(<LoginInput />);

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    // Action
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    // Assert
    await waitFor(() => {
      expect(mockedNavigate).not.toHaveBeenCalled();
    });
  });

  it('should navigate to home page when login succeeds', async () => {
    // Arrange
    asyncLogin.mockImplementation(() => () => Promise.resolve(true));
    renderWithProviders(<LoginInput />);

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    // Action
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    // Assert
    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('should show error message when isAuthError is true', () => {
    // Arrange
    const errorMessage = 'Invalid email or password';
    const store = createMockStore(true, errorMessage);

    // Action
    renderWithProviders(<LoginInput />, { store });

    // Assert
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('should clear auth error when input changes', () => {
    // Arrange
    clearAuthErrorActionCreator.mockReturnValue({ type: 'CLEAR_AUTH_ERROR' });
    const store = createMockStore(true, 'Invalid email or password');

    renderWithProviders(<LoginInput />, { store });
    const emailInput = screen.getByLabelText(/Email/i);

    // Action
    fireEvent.change(emailInput, { target: { value: 'new@example.com' } });

    // Assert
    expect(clearAuthErrorActionCreator).toHaveBeenCalled();
  });
});
