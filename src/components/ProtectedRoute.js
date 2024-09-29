import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, userType }) => {
  const token = localStorage.getItem('token');
  const storedUserType = localStorage.getItem('userType');

  if (!token) {
    // If not authenticated, redirect to login
    return <Navigate to="/login" />;
  }

  if (storedUserType !== userType) {
    // If user type does not match, redirect to a relevant page (e.g., home)
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
