import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { asyncAddComment } from '../../states/actions/commentActions';
import Button from '../common/Button';
import Textarea from '../common/Textarea';

function CommentInput({ threadId }) {
  const [content, setContent] = useState('');
  const { authUser, isAuthenticated } = useSelector((states) => states.auth);
  const dispatch = useDispatch();

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      dispatch(asyncAddComment({ threadId, content }));
      setContent('');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-gray-50 p-4 rounded-lg mt-6 text-center">
        <p className="text-gray-600">Please login to add a comment</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow mt-6 p-4">
      <h3 className="text-lg font-medium mb-3">Add a Comment</h3>
      <div className="flex items-start space-x-3">
        <img
          src={authUser.avatar || `https://ui-avatars.com/api/?name=${authUser.name}`}
          alt={authUser.name}
          className="w-10 h-10 rounded-full"
        />
        <form onSubmit={handleSubmit} className="flex-1">
          <Textarea
            rows={3}
            placeholder="Write your comment..."
            value={content}
            onChange={handleContentChange}
            required
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={!content.trim()}>
              Post Comment
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

CommentInput.propTypes = {
  threadId: PropTypes.string.isRequired,
};

export default CommentInput;
