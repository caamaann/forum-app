import PropTypes from 'prop-types';

export const LeaderboardItemPropTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
  score: PropTypes.number.isRequired,
  rank: PropTypes.number.isRequired,
};

export const ThreadPropTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  category: PropTypes.string,
  createdAt: PropTypes.string,
  owner: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
  }),
  totalComments: PropTypes.number,
  upVotesBy: PropTypes.arrayOf(PropTypes.string),
  downVotesBy: PropTypes.array,
};

export const CommentPropTypes = {
  id: PropTypes.string,
  content: PropTypes.string,
  createdAt: PropTypes.string,
  owner: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
  }),
  upVotesBy: PropTypes.array,
  downVotesBy: PropTypes.array,
};
