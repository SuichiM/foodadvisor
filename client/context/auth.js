// hook for user context
//
// Path: client/context/user.js

import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /* 
    Check if there is a token and user in localstorage
  */
  useEffect(() => {
    const token = window.localStorage.getItem('jwtToken');
    const user = window.localStorage.getItem('user');

    if (token && user) {
      setAuthData({ token, user: JSON.parse(user) });
    }
  }, []);

  /*
    Check if there is a user in authData
  */
  useEffect(() => {
    if (authData.user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [authData]);

  /* 
    Save token and user in localstorage
  */
  useEffect(() => {
    if (authData.token && authData.user) {
      window.localStorage.setItem('jwtToken', authData.token);
      window.localStorage.setItem('user', JSON.stringify(authData.user));
    }
  }, [authData]);

  const login = (token, user) => {
    setAuthData({ token, user });
  };

  const logout = () => {
    setAuthData({});
    window.localStorage.removeItem('jwtToken');
    window.localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{ user: authData.user, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
