import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Todo from './Components/Todo';
import Settings from './Components/Settings';
import Header from './Components/Header';
import { MantineProvider } from '@mantine/core'; 
import SettingsProvider from './context/Setting';
import './App.scss';

const App = () => {
  return (
    <MantineProvider> 
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
    </MantineProvider>
  );
};

export default App;
