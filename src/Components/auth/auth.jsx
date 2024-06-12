import React, { useContext } from 'react';
import { When } from 'react-if';
import { LoginContext } from './context';

const Auth = ({ capability, children }) => {
  const { loggedIn, can } = useContext(LoginContext);
  const okToRender = loggedIn && can(capability);

  return (
    <When condition={okToRender}>
      {children}
    </When>
  );
};

export default Auth;
