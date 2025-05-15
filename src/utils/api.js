const API_BASE_URL = 'https://forum-api.dicoding.dev/v1';

async function fetchWithAuth(url, options = {}) {
  const token = localStorage.getItem('accessToken');
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    },
  });
}

const api = {
  register: async ({ name, email, password }) => {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }

    return responseJson.data.user;
  },

  login: async ({ email, password }) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }

    return responseJson.data.token;
  },

  getOwnProfile: async () => {
    const response = await fetchWithAuth(`${API_BASE_URL}/users/me`);
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }

    return responseJson.data.user;
  },

  getAllUsers: async () => {
    const response = await fetch(`${API_BASE_URL}/users`);
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    return responseJson.data.users;
  },

  getAllThreads: async () => {
    const response = await fetch(`${API_BASE_URL}/threads`);
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }

    return responseJson.data.threads;
  },

  getThreadDetail: async (id) => {
    const response = await fetch(`${API_BASE_URL}/threads/${id}`);
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }

    return responseJson.data.detailThread;
  },

  createThread: async ({ title, body, category = '' }) => {
    const response = await fetchWithAuth(`${API_BASE_URL}/threads`, {
      method: 'POST',
      body: JSON.stringify({ title, body, category }),
    });
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }

    return responseJson.data.thread;
  },

  createComment: async (threadId, content) => {
    const response = await fetchWithAuth(`${API_BASE_URL}/threads/${threadId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }

    return responseJson.data.comment;
  },

  upvoteThread: async (threadId) => {
    const response = await fetchWithAuth(`${API_BASE_URL}/threads/${threadId}/up-vote`, {
      method: 'POST',
    });
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }

    return responseJson.data.vote;
  },

  downvoteThread: async (threadId) => {
    const response = await fetchWithAuth(`${API_BASE_URL}/threads/${threadId}/down-vote`, {
      method: 'POST',
    });
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }

    return responseJson.data.vote;
  },

  neutralVoteThread: async (threadId) => {
    const response = await fetchWithAuth(`${API_BASE_URL}/threads/${threadId}/neutral-vote`, {
      method: 'POST',
    });
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }

    return responseJson.data.vote;
  },

  upvoteComment: async (threadId, commentId) => {
    const response = await fetchWithAuth(
      `${API_BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
      {
        method: 'POST',
      }
    );
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }

    return responseJson.data.vote;
  },

  downvoteComment: async (threadId, commentId) => {
    const response = await fetchWithAuth(
      `${API_BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
      {
        method: 'POST',
      }
    );
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }

    return responseJson.data.vote;
  },

  neutralVoteComment: async (threadId, commentId) => {
    const response = await fetchWithAuth(
      `${API_BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
      {
        method: 'POST',
      }
    );
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }

    return responseJson.data.vote;
  },

  getLeaderboard: async () => {
    const response = await fetch(`${API_BASE_URL}/leaderboards`);
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }

    return responseJson.data.leaderboards;
  },
};

export default api;
