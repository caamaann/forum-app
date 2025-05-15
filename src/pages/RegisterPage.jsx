import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RegisterInput from '../components/auth/RegisterInput';

function RegisterPage() {
  const { isAuthenticated } = useSelector((states) => states.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <RegisterInput />
    </div>
  );
}

export default RegisterPage;
