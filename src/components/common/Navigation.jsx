import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncLogout } from '../../states/actions/authActions';

function Navigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authUser } = useSelector((states) => states.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch(asyncLogout());
    toggleMenu();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-xl font-bold text-blue-600">Forum App</span>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <Link
                  to="/"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  Home
                </Link>
                <Link
                  to="/leaderboard"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  Leaderboard
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {authUser ? (
                <div className="flex items-center">
                  <Link
                    to="/create"
                    className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 mr-3"
                  >
                    New Thread
                  </Link>
                  <div className="relative">
                    <button
                      type="button"
                      className="flex items-center max-w-xs rounded-full text-sm focus:outline-none"
                      onClick={toggleMenu}
                    >
                      <img
                        className="h-8 w-8 rounded-full"
                        src={authUser.avatar || `https://ui-avatars.com/api/?name=${authUser.name}`}
                        alt={authUser.name}
                      />
                      <span className="ml-2 text-gray-700">{authUser.name}</span>
                    </button>
                    {isMenuOpen && (
                      <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div
                          className="py-1"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="user-menu"
                        >
                          <button
                            type="button"
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                            onClick={handleLogout}
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 mr-2"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-blue-600 focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/leaderboard"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Leaderboard
            </Link>
            {authUser && (
              <Link
                to="/create"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                New Thread
              </Link>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {authUser ? (
              <div className="px-2">
                <div className="flex items-center px-3">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={authUser.avatar || `https://ui-avatars.com/api/?name=${authUser.name}`}
                      alt={authUser.name}
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{authUser.name}</div>
                    <div className="text-sm font-medium text-gray-500">{authUser.email}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <button
                    type="button"
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="px-2 space-y-1">
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
