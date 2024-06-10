import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <Link to="/">Home</Link>
        <Link to="/settings">Settings</Link>
      </div>
      <div className="header-right">
        <button className="logout-button">Log out</button>
      </div>
    </header>
  );
};

export default Header;
