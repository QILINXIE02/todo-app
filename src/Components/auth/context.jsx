import React, { createContext, useState, useEffect } from 'react';
import cookie from 'react-cookies';
import jwt_decode from 'jwt-decode';

export const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({ capabilities: [] });
  const [error, setError] = useState(null);

  const login = async (username, password) => {
    try {
      // Simulate API login
      const token = 'your_token_here'; // Replace with actual token from API
      const decoded = jwt_decode(token);
      cookie.save('auth', token);
      setLoggedIn(true);
      setUser(decoded);
    } catch (error) {
      setError(error.message);
    }
  };

  const logout = () => {
    cookie.remove('auth');
    setLoggedIn(false);
    setUser({ capabilities: [] });
    setError(null);
  };

  const can = (capability) => {
    return user.capabilities.includes(capability);
  };

  useEffect(() => {
    const token = cookie.load('auth');
    if (token) {
      try {
        const decoded = jwt_decode(token);
        setLoggedIn(true);
        setUser(decoded);
      } catch (error) {
        setError(error.message);
      }
    }
  }, []);

  const value = {
    loggedIn,
    user,
    error,
    login,
    logout,
    can,
  };

  return (
    <LoginContext.Provider value={value}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
