import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Todo from './Components/Todo';
import SettingsProvider from './context/Setting';
import './App.scss'; // Import the new styles

const App = () => {
  return (
    <Router>
      <SettingsProvider>
        <div className="app">
          <header className="app-header">
            <div className="left-header">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/settings" className="nav-link">Settings</Link>
            </div>
            <div className="right-header">
              <button className="logout-button">Logout</button>
            </div>
          </header>
          <Routes>
            <Route path="/" element={<Todo />} />
          </Routes>
        </div>
      </SettingsProvider>
    </Router>
  );
};

export default App;
