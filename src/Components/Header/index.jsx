import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LoginContext } from '../auth/context';
import Login from '../auth/login';
import './header.scss';

const Header = () => {
  const { loggedIn, logout } = useContext(LoginContext);

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/">Home</Link>
        <Link to="/settings">Settings</Link>
      </div>
      <div className="header-right">
        {loggedIn ? (
          <button className="logout-button" onClick={logout}>Log out</button>
        ) : (
          <Login />
        )}
      </div>
    </header>
  );
};

export default Header;
