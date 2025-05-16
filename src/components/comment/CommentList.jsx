import React from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';
import { CommentPropTypes } from '../../utils/types';

function CommentList({ comments, threadId }) {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-4">Comments ({comments.length})</h3>

      {comments.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No comments yet</p>
      ) : (
        <div className="space-y-2">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} threadId={threadId} />
          ))}
        </div>
      )}
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape(CommentPropTypes)).isRequired,
  threadId: PropTypes.string.isRequired,
};

export default CommentList;
