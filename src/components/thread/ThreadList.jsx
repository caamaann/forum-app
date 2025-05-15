import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem from './ThreadItem';
import LoadingIndicator from '../common/LoadingIndicator';
import { ThreadPropTypes } from '../../utils/types';

function ThreadList({ threads, loading }) {
  if (loading) {
    return <LoadingIndicator />;
  }

  if (threads.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">No threads found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {threads.map((thread) => (
        <ThreadItem key={thread.id} thread={thread} />
      ))}
    </div>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(ThreadPropTypes)).isRequired,
  loading: PropTypes.bool,
};

ThreadList.defaultProps = {
  loading: false,
};

export default ThreadList;
