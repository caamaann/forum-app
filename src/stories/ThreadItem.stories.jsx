import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import ThreadItem from '../components/thread/ThreadItem';

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
  title: 'Components/ThreadItem',
  component: ThreadItem,
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
};

// Basic thread data
const baseThread = {
  id: 'thread-1',
  title: 'Thread Title',
  body: 'This is the body of the thread with some content to display.',
  category: 'general',
  createdAt: new Date().toISOString(),
  owner: {
    id: 'user-1',
    name: 'John Doe',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe',
  },
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 5,
};

// Template for stories
function Template(args) {
  return <ThreadItem {...args} />;
}

// Default thread
export const Default = Template.bind({});
Default.args = {
  thread: baseThread,
};

// Thread with long title and body
export const LongContent = Template.bind({});
LongContent.args = {
  thread: {
    ...baseThread,
    title:
      'This is a very long thread title that will probably wrap to multiple lines on smaller screens',
    body: 'This is a very long thread body with lots of content. '.repeat(10),
  },
};

// Thread with category
export const WithCategory = Template.bind({});
WithCategory.args = {
  thread: {
    ...baseThread,
    category: 'discussion',
  },
};

// Thread without category
export const WithoutCategory = Template.bind({});
WithoutCategory.args = {
  thread: {
    ...baseThread,
    category: '',
  },
};

// Thread with votes
export const WithVotes = Template.bind({});
WithVotes.args = {
  thread: {
    ...baseThread,
    upVotesBy: ['user-2', 'user-3', 'user-4'],
    downVotesBy: ['user-5', 'user-6'],
  },
};

// Thread with authenticated user who has upvoted
export function UserUpvoted(args) {
  const store = createMockStore({
    id: 'user-2',
    name: 'Auth User',
  });

  return (
    <Provider store={store}>
      <ThreadItem {...args} />
    </Provider>
  );
}

UserUpvoted.args = {
  thread: {
    ...baseThread,
    upVotesBy: ['user-2', 'user-3'],
    downVotesBy: [],
  },
};

// Thread with authenticated user who has downvoted
export function UserDownvoted(args) {
  const store = createMockStore({
    id: 'user-5',
    name: 'Auth User',
  });

  return (
    <Provider store={store}>
      <ThreadItem {...args} />
    </Provider>
  );
}

UserDownvoted.args = {
  thread: {
    ...baseThread,
    upVotesBy: [],
    downVotesBy: ['user-5', 'user-6'],
  },
};
