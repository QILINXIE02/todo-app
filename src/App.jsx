import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Todo from './Components/Todo';
import Settings from './Components/Settings';
import Header from './Components/Header';
import SettingsProvider from './context/Setting';
import './App.scss';

const App = () => {
  return (
    <SettingsProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Todo />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <footer>@2024 Qilin Xie</footer>
      </Router>
    </SettingsProvider>
  );
};

export default App;
