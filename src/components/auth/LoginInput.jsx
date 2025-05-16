import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncLogin, clearAuthErrorActionCreator } from '../../states/actions/authActions';
import Button from '../common/Button';
import Input from '../common/Input';

function LoginInput() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthError, authErrorMessage } = useSelector((states) => states.auth);

  const handleChange = (e, setter) => {
    setter(e.target.value);
    if (isAuthError) {
      dispatch(clearAuthErrorActionCreator());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await dispatch(asyncLogin({ email, password }));
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Login to Your Account</h2>

      {isAuthError && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md" role="alert">
          {authErrorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Input
            label="Email"
            type="email"
            id="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => handleChange(e, setEmail)}
            required
          />
        </div>

        <div className="mb-6">
          <Input
            label="Password"
            type="password"
            id="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => handleChange(e, setPassword)}
            required
          />
        </div>

        <Button type="submit" fullWidth>
          Login
        </Button>
      </form>

      <p className="mt-4 text-center text-gray-600">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register here
        </Link>
      </p>
    </div>
  );
}

export default LoginInput;
