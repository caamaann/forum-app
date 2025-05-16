/**
 * Scenario:
 * - ThreadItem component:
 *   - should render thread item correctly
 *   - should navigate to thread detail when title is clicked
 *   - should display thread category when category is provided
 *   - should call upvote function when upvote button is clicked
 *   - should call downvote function when downvote button is clicked
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import ThreadItem from '../../components/thread/ThreadItem';
import {
  asyncToggleUpvoteThread,
  asyncToggleDownvoteThread,
} from '../../states/actions/threadActions';

// Mock Redux
jest.mock('../../states/actions/threadActions');

// Create mock store
const createMockStore = (authUser = null) =>
  configureStore({
    reducer: {
      auth: () => ({
        authUser,
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

describe('ThreadItem component', () => {
  // Sample thread data
  const thread = {
    id: 'thread-1',
    title: 'Test Thread Title',
    body: 'This is the body of the test thread',
    category: 'test-category',
    createdAt: '2022-01-01T00:00:00.000Z',
    owner: {
      id: 'user-1',
      name: 'Test User',
      avatar: 'https://example.com/avatar.jpg',
    },
    upVotesBy: ['user-2'],
    downVotesBy: ['user-3'],
    totalComments: 5,
  };

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
  });

  it('should render thread item correctly', () => {
    // Arrange & Action
    renderWithProviders(<ThreadItem thread={thread} />);

    // Assert
    expect(screen.getByText(thread.title)).toBeInTheDocument();
    expect(screen.getByText(thread.owner.name)).toBeInTheDocument();
    expect(screen.getByText(/This is the body/)).toBeInTheDocument();
    expect(screen.getByText(`#${thread.category}`)).toBeInTheDocument();

    // Use more specific queries to avoid ambiguity
    const upvoteButton = screen.getByLabelText('Upvote');
    expect(upvoteButton.nextSibling).toHaveTextContent(thread.upVotesBy.length.toString());

    const downvoteButton = screen.getByLabelText('Downvote');
    expect(downvoteButton.nextSibling).toHaveTextContent(thread.downVotesBy.length.toString());

    // Find comments count near the comment icon
    const commentsSection = screen.getAllByText(thread.totalComments.toString())[0];
    expect(commentsSection).toBeInTheDocument();
  });

  it('should display thread category when category is provided', () => {
    // Arrange & Action
    renderWithProviders(<ThreadItem thread={thread} />);

    // Assert
    expect(screen.getByText(`#${thread.category}`)).toBeInTheDocument();
  });

  it('should not display thread category when category is not provided', () => {
    // Arrange
    const threadWithoutCategory = {
      ...thread,
      category: '',
    };

    // Action
    renderWithProviders(<ThreadItem thread={threadWithoutCategory} />);

    // Assert
    expect(screen.queryByText(/^#/)).not.toBeInTheDocument();
  });

  it('should call upvote function when upvote button is clicked and user is authenticated', () => {
    // Arrange
    const authUser = {
      id: 'user-1',
      name: 'Auth User',
    };
    const store = createMockStore(authUser);
    asyncToggleUpvoteThread.mockImplementation(() => () => {});

    // Action
    renderWithProviders(<ThreadItem thread={thread} />, { store });

    // Find upvote button (by aria-label)
    const upvoteButton = screen.getByLabelText('Upvote');
    fireEvent.click(upvoteButton);

    // Assert
    expect(asyncToggleUpvoteThread).toHaveBeenCalledWith(thread.id);
  });

  it('should call downvote function when downvote button is clicked and user is authenticated', () => {
    // Arrange
    const authUser = {
      id: 'user-1',
      name: 'Auth User',
    };
    const store = createMockStore(authUser);
    asyncToggleDownvoteThread.mockImplementation(() => () => {});

    // Action
    renderWithProviders(<ThreadItem thread={thread} />, { store });

    // Find downvote button (by aria-label)
    const downvoteButton = screen.getByLabelText('Downvote');
    fireEvent.click(downvoteButton);

    // Assert
    expect(asyncToggleDownvoteThread).toHaveBeenCalledWith(thread.id);
  });

  it('should show highlighted upvote button when thread is upvoted by current user', () => {
    // Arrange
    const authUser = {
      id: 'user-2', // This user has upvoted the thread
      name: 'Auth User',
    };
    const store = createMockStore(authUser);

    // Action
    renderWithProviders(<ThreadItem thread={thread} />, { store });

    // Find upvote button
    const upvoteButton = screen.getByLabelText('Upvote');

    // Assert
    expect(upvoteButton).toHaveClass('text-blue-600');
  });

  it('should show highlighted downvote button when thread is downvoted by current user', () => {
    // Arrange
    const authUser = {
      id: 'user-3', // This user has downvoted the thread
      name: 'Auth User',
    };
    const store = createMockStore(authUser);

    // Action
    renderWithProviders(<ThreadItem thread={thread} />, { store });

    // Find downvote button
    const downvoteButton = screen.getByLabelText('Downvote');

    // Assert
    expect(downvoteButton).toHaveClass('text-red-600');
  });

  it('should truncate thread body if it is too long', () => {
    // Arrange
    const longBody = 'a'.repeat(200); // Longer than the 150 character limit
    const threadWithLongBody = {
      ...thread,
      body: longBody,
    };

    // Action
    renderWithProviders(<ThreadItem thread={threadWithLongBody} />);

    // Assert
    const displayedBody = screen.getByText(/^a+/);
    expect(displayedBody.textContent.length).toBeLessThan(longBody.length);
    expect(displayedBody.textContent).toContain('...');
  });
});
