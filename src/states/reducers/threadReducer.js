import { ActionType } from '../actions/actionTypes';

const initialState = {
  threads: [],
  threadDetail: null,
  categories: [],
  filteredCategory: '',
  isLoading: false,
  error: null,
};

function extractCategories(threads) {
  const categoriesSet = new Set(
    threads
      .map((thread) => thread.category)
      .filter((category) => category && category.trim() !== '')
  );
  return Array.from(categoriesSet);
}

function threadsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return {
        ...state,
        threads: action.payload.threads,
        categories: extractCategories(action.payload.threads),
      };
    case ActionType.ADD_THREAD:
      return {
        ...state,
        threads: [action.payload.thread, ...state.threads],
        categories: extractCategories([action.payload.thread, ...state.threads]),
      };
    case ActionType.RECEIVE_THREAD_DETAIL:
      return {
        ...state,
        threadDetail: action.payload.threadDetail,
      };
    case ActionType.ADD_COMMENT:
      return {
        ...state,
        threadDetail: {
          ...state.threadDetail,
          comments: [action.payload.comment, ...state.threadDetail.comments],
        },
      };
    case ActionType.TOGGLE_UPVOTE_THREAD:
      return {
        ...state,
        threads: state.threads.map((thread) => {
          if (thread.id === action.payload.threadId) {
            return {
              ...thread,
              upVotesBy: thread.upVotesBy.includes(action.payload.userId)
                ? thread.upVotesBy.filter((id) => id !== action.payload.userId)
                : [...thread.upVotesBy, action.payload.userId],
              downVotesBy: thread.downVotesBy.filter((id) => id !== action.payload.userId),
            };
          }
          return thread;
        }),
        threadDetail:
          state.threadDetail && state.threadDetail.id === action.payload.threadId
            ? {
                ...state.threadDetail,
                upVotesBy: state.threadDetail.upVotesBy.includes(action.payload.userId)
                  ? state.threadDetail.upVotesBy.filter((id) => id !== action.payload.userId)
                  : [...state.threadDetail.upVotesBy, action.payload.userId],
                downVotesBy: state.threadDetail.downVotesBy.filter(
                  (id) => id !== action.payload.userId
                ),
              }
            : state.threadDetail,
      };
    case ActionType.TOGGLE_DOWNVOTE_THREAD:
      return {
        ...state,
        threads: state.threads.map((thread) => {
          if (thread.id === action.payload.threadId) {
            return {
              ...thread,
              downVotesBy: thread.downVotesBy.includes(action.payload.userId)
                ? thread.downVotesBy.filter((id) => id !== action.payload.userId)
                : [...thread.downVotesBy, action.payload.userId],
              upVotesBy: thread.upVotesBy.filter((id) => id !== action.payload.userId),
            };
          }
          return thread;
        }),
        threadDetail:
          state.threadDetail && state.threadDetail.id === action.payload.threadId
            ? {
                ...state.threadDetail,
                downVotesBy: state.threadDetail.downVotesBy.includes(action.payload.userId)
                  ? state.threadDetail.downVotesBy.filter((id) => id !== action.payload.userId)
                  : [...state.threadDetail.downVotesBy, action.payload.userId],
                upVotesBy: state.threadDetail.upVotesBy.filter(
                  (id) => id !== action.payload.userId
                ),
              }
            : state.threadDetail,
      };
    case ActionType.NEUTRAL_VOTE_THREAD:
      return {
        ...state,
        threads: state.threads.map((thread) => {
          if (thread.id === action.payload.threadId) {
            return {
              ...thread,
              upVotesBy: thread.upVotesBy.filter((id) => id !== action.payload.userId),
              downVotesBy: thread.downVotesBy.filter((id) => id !== action.payload.userId),
            };
          }
          return thread;
        }),
        threadDetail:
          state.threadDetail && state.threadDetail.id === action.payload.threadId
            ? {
                ...state.threadDetail,
                upVotesBy: state.threadDetail.upVotesBy.filter(
                  (id) => id !== action.payload.userId
                ),
                downVotesBy: state.threadDetail.downVotesBy.filter(
                  (id) => id !== action.payload.userId
                ),
              }
            : state.threadDetail,
      };
    case ActionType.TOGGLE_UPVOTE_COMMENT:
      return {
        ...state,
        threadDetail: {
          ...state.threadDetail,
          comments: state.threadDetail.comments.map((comment) => {
            if (comment.id === action.payload.commentId) {
              return {
                ...comment,
                upVotesBy: comment.upVotesBy.includes(action.payload.userId)
                  ? comment.upVotesBy.filter((id) => id !== action.payload.userId)
                  : [...comment.upVotesBy, action.payload.userId],
                downVotesBy: comment.downVotesBy.filter((id) => id !== action.payload.userId),
              };
            }
            return comment;
          }),
        },
      };
    case ActionType.TOGGLE_DOWNVOTE_COMMENT:
      return {
        ...state,
        threadDetail: {
          ...state.threadDetail,
          comments: state.threadDetail.comments.map((comment) => {
            if (comment.id === action.payload.commentId) {
              return {
                ...comment,
                downVotesBy: comment.downVotesBy.includes(action.payload.userId)
                  ? comment.downVotesBy.filter((id) => id !== action.payload.userId)
                  : [...comment.downVotesBy, action.payload.userId],
                upVotesBy: comment.upVotesBy.filter((id) => id !== action.payload.userId),
              };
            }
            return comment;
          }),
        },
      };
    case ActionType.NEUTRAL_VOTE_COMMENT:
      return {
        ...state,
        threadDetail: {
          ...state.threadDetail,
          comments: state.threadDetail.comments.map((comment) => {
            if (comment.id === action.payload.commentId) {
              return {
                ...comment,
                upVotesBy: comment.upVotesBy.filter((id) => id !== action.payload.userId),
                downVotesBy: comment.downVotesBy.filter((id) => id !== action.payload.userId),
              };
            }
            return comment;
          }),
        },
      };
    case ActionType.SET_FILTER_CATEGORY:
      return {
        ...state,
        filteredCategory: action.payload.category,
      };
    case ActionType.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    case ActionType.SET_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
}

export default threadsReducer;
