import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector((states) => states.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
