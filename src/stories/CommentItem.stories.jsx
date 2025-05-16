import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import CommentItem from '../components/comment/CommentItem';

// Create mock store
const createMockStore = (authUser = null) =>
  configureStore({
    reducer: {
      auth: () => ({
        authUser,
      }),
    },
  });

export default {
  title: 'Components/CommentItem',
  component: CommentItem,
  decorators: [
    (Story) => (
      <Provider store={createMockStore()}>
        <BrowserRouter>
          <div className="max-w-lg mx-auto p-4">
            <Story />
          </div>
        </BrowserRouter>
      </Provider>
    ),
  ],
  argTypes: {
    threadId: { control: 'text' },
  },
};

// Basic comment data
const baseComment = {
  id: 'comment-1',
  content: 'This is a comment on the thread. It provides additional insight or asks a question.',
  createdAt: new Date().toISOString(),
  owner: {
    id: 'user-1',
    name: 'Jane Doe',
    avatar: 'https://ui-avatars.com/api/?name=Jane+Doe',
  },
  upVotesBy: [],
  downVotesBy: [],
};

// Template for stories
function Template(args) {
  return <CommentItem {...args} />;
}

// Default comment
export const Default = Template.bind({});
Default.args = {
  comment: baseComment,
  threadId: 'thread-1',
};

// Long comment content
export const LongContent = Template.bind({});
LongContent.args = {
  comment: {
    ...baseComment,
    content:
      'This is a very long comment that contains a lot of text. It might span multiple lines and provide detailed information about the topic at hand. Long comments like this help to foster discussion and provide more context for readers. They can include explanations, references, or anecdotes related to the thread topic.',
  },
  threadId: 'thread-1',
};

// Comment with formatted content
export const FormattedContent = Template.bind({});
FormattedContent.args = {
  comment: {
    ...baseComment,
    content:
      '<p>This comment has <strong>formatted</strong> content with <em>different</em> styles.</p><p>It includes multiple paragraphs and <a href="#">links</a>.</p>',
  },
  threadId: 'thread-1',
};

// Comment with votes
export const WithVotes = Template.bind({});
WithVotes.args = {
  comment: {
    ...baseComment,
    upVotesBy: ['user-2', 'user-3', 'user-4'],
    downVotesBy: ['user-5', 'user-6'],
  },
  threadId: 'thread-1',
};

// Comment with authenticated user who has upvoted
export function UserUpvoted(args) {
  const store = createMockStore({
    id: 'user-3',
    name: 'Auth User',
  });

  return (
    <Provider store={store}>
      <CommentItem {...args} />
    </Provider>
  );
}

UserUpvoted.args = {
  comment: {
    ...baseComment,
    upVotesBy: ['user-2', 'user-3'],
    downVotesBy: [],
  },
  threadId: 'thread-1',
};

// Comment with authenticated user who has downvoted
export function UserDownvoted(args) {
  const store = createMockStore({
    id: 'user-5',
    name: 'Auth User',
  });

  return (
    <Provider store={store}>
      <CommentItem {...args} />
    </Provider>
  );
}

UserDownvoted.args = {
  comment: {
    ...baseComment,
    upVotesBy: [],
    downVotesBy: ['user-5', 'user-6'],
  },
  threadId: 'thread-1',
};
