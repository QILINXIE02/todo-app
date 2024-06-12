import React, { useContext } from 'react';
import { LoginContext } from './context';

const Auth = ({ capability, children }) => {
  const { loggedIn, user } = useContext(LoginContext);

  // Check if user has the required capability
  const hasCapability = user.capabilities.includes(capability);

  // If logged in and has capability, render children
  if (loggedIn && hasCapability) {
    return <>{children}</>;
  } else {
    return null; // Return null if not logged in or doesn't have capability
  }
};

export default Auth;
