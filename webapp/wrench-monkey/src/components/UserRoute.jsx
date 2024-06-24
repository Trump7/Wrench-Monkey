import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../utilities/auth';

const UserRoute = ({ children }) => {
  const isAuth = isAuthenticated();
  const userRole = getUserRole();

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  if (userRole !== 'user') {
    return <Navigate to="/manager" />;
  }

  return children;
};

export default UserRoute;
