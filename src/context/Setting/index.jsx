import React, { createContext, useState, useEffect } from 'react';

export const SettingsContext = createContext();

const SettingsProvider = ({ children }) => {
  const [displaySettings, setDisplaySettings] = useState({
    hideCompleted: false,
    itemsPerPage: 3,
    sortWord: 'difficulty',
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('displaySettings');
    if (savedSettings) {
      setDisplaySettings(JSON.parse(savedSettings));
    }
  }, []);

  const updateSettings = (newSettings) => {
    setDisplaySettings((prevSettings) => ({
      ...prevSettings,
      ...newSettings,
    }));
    localStorage.setItem('displaySettings', JSON.stringify(newSettings));
  };

  return (
    <SettingsContext.Provider value={{ displaySettings, setDisplaySettings: updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
