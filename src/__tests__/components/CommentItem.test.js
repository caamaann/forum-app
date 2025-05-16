/**
 * Scenario:
 * - CommentItem component:
 *   - should render comment item correctly
 *   - should display correctly formatted date
 *   - should call upvote function when upvote button is clicked
 *   - should call downvote function when downvote button is clicked
 *   - should show highlighted upvote button when comment is upvoted by current user
 *   - should show highlighted downvote button when comment is downvoted by current user
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import CommentItem from '../../components/comment/CommentItem';
import {
  asyncToggleUpvoteComment,
  asyncToggleDownvoteComment,
} from '../../states/actions/commentActions';

// Mock Redux
jest.mock('../../states/actions/commentActions');

// Mock date-fns
jest.mock('date-fns', () => ({
  formatDistanceToNow: jest.fn(() => 'a few minutes ago'),
}));

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

describe('CommentItem component', () => {
  // Sample comment data
  const comment = {
    id: 'comment-1',
    content: 'This is a test comment',
    createdAt: '2022-01-01T00:00:00.000Z',
    owner: {
      id: 'user-1',
      name: 'Test User',
      avatar: 'https://example.com/avatar.jpg',
    },
    upVotesBy: ['user-2'],
    downVotesBy: ['user-3'],
  };

  const threadId = 'thread-1';

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
  });

  it('should render comment item correctly', () => {
    // Arrange & Action
    renderWithProviders(<CommentItem comment={comment} threadId={threadId} />);

    // Assert
    // Content text might be inside HTML so use a partial match
    expect(screen.getByText(/This is a test comment/)).toBeInTheDocument();
    expect(screen.getByText(comment.owner.name)).toBeInTheDocument();
    expect(screen.getByText('a few minutes ago')).toBeInTheDocument();

    // Check for upvote and downvote buttons
    const upvoteButton = screen.getByLabelText('Upvote');
    const downvoteButton = screen.getByLabelText('Downvote');

    expect(upvoteButton).toBeInTheDocument();
    expect(downvoteButton).toBeInTheDocument();

    // Verify that vote counts are displayed (but don't check exact text)
    expect(upvoteButton.querySelector('span')).toBeInTheDocument();
    expect(downvoteButton.querySelector('span')).toBeInTheDocument();

    // Check for avatar - find image with alt text matching owner name
    const avatar = screen.getByAltText(comment.owner.name);
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', comment.owner.avatar);
  });

  it('should display correctly formatted date', () => {
    // Arrange & Action
    renderWithProviders(<CommentItem comment={comment} threadId={threadId} />);

    // Assert
    expect(screen.getByText('a few minutes ago')).toBeInTheDocument();
  });

  it('should call upvote function when upvote button is clicked and user is authenticated', () => {
    // Arrange
    const authUser = {
      id: 'user-1',
      name: 'Auth User',
    };
    const store = createMockStore(authUser);
    asyncToggleUpvoteComment.mockImplementation(() => () => {});

    // Action
    renderWithProviders(<CommentItem comment={comment} threadId={threadId} />, { store });

    // Find upvote button by aria-label
    const upvoteButton = screen.getByLabelText('Upvote');
    fireEvent.click(upvoteButton);

    // Assert
    expect(asyncToggleUpvoteComment).toHaveBeenCalledWith({
      threadId,
      commentId: comment.id,
    });
  });

  it('should call downvote function when downvote button is clicked and user is authenticated', () => {
    // Arrange
    const authUser = {
      id: 'user-1',
      name: 'Auth User',
    };
    const store = createMockStore(authUser);
    asyncToggleDownvoteComment.mockImplementation(() => () => {});

    // Action
    renderWithProviders(<CommentItem comment={comment} threadId={threadId} />, { store });

    // Find downvote button by aria-label
    const downvoteButton = screen.getByLabelText('Downvote');
    fireEvent.click(downvoteButton);

    // Assert
    expect(asyncToggleDownvoteComment).toHaveBeenCalledWith({
      threadId,
      commentId: comment.id,
    });
  });

  it('should show highlighted upvote button when comment is upvoted by current user', () => {
    // Arrange
    const authUser = {
      id: 'user-2', // This user has upvoted the comment
      name: 'Auth User',
    };
    const store = createMockStore(authUser);

    // Action
    renderWithProviders(<CommentItem comment={comment} threadId={threadId} />, { store });

    // Find upvote button
    const upvoteButton = screen.getByLabelText('Upvote');

    // Assert
    expect(upvoteButton).toHaveClass('text-blue-600');
  });

  it('should show highlighted downvote button when comment is downvoted by current user', () => {
    // Arrange
    const authUser = {
      id: 'user-3', // This user has downvoted the comment
      name: 'Auth User',
    };
    const store = createMockStore(authUser);

    // Action
    renderWithProviders(<CommentItem comment={comment} threadId={threadId} />, { store });

    // Find downvote button
    const downvoteButton = screen.getByLabelText('Downvote');

    // Assert
    expect(downvoteButton).toHaveClass('text-red-600');
  });
});
