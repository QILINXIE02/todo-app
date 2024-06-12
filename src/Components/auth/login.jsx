import React, { useState, useContext } from 'react';
import { LoginContext } from './context';

const Login = () => {
  const { login, loggedIn, logout } = useContext(LoginContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{loggedIn ? 'Logout' : 'Login'}</button>
      </form>
    </>
  );
};

export default Login;
