import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';

import HomePage from './pages/HomePage';
import ThreadDetailPage from './pages/ThreadDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LeaderboardPage from './pages/LeaderboardPage';
import CreateThreadPage from './pages/CreateThreadPage';

import Navigation from './components/common/Navigation';
import ProtectedRoute from './components/common/ProtectedRoute';

import { asyncPreloadUser } from './states/actions/authActions';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadUser());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Router>
        <div className="sticky top-0 z-10">
          <LoadingBar style={{ backgroundColor: '#3B82F6', height: '3px' }} />
          <Navigation />
        </div>
        <main className="container mx-auto px-4 py-6 flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/threads/:id" element={<ThreadDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <CreateThreadPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
