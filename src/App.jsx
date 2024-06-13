import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Todo from './Components/Todo';
import Settings from './Components/Settings';
import Header from './Components/Header';
import LoginProvider from './Components/auth/context';
import Auth from './Components/auth/auth';
import SettingsProvider from './context/Setting';
import './App.scss';

const App = () => {
  return (
    <LoginProvider>
      <SettingsProvider> {/* Wrap your components with SettingsProvider */}
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Todo />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
          <footer>@2024 Qilin Xie</footer>
        </Router>
        <Auth capability="read">
          <div>Any valid user can see this</div>
        </Auth>
        <Auth capability="create">
          <div>Users with create access can see this</div>
        </Auth>
        <Auth capability="update">
          <div>Users with update access can see this</div>
        </Auth>
        <Auth capability="delete">
          <div>Users with delete access can see this</div>
        </Auth>
      </SettingsProvider>
    </LoginProvider>
  );
};

export default App;
