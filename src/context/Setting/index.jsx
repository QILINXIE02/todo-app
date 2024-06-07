import React, { createContext, useState } from 'react';

export const SettingsContext = createContext();

const SettingsProvider = ({ children }) => {
  const defaultSettings = {
    itemsPerPage: 3,
    hideCompleted: true,
    sortWord: 'difficulty',
  };

  const [displaySettings, setDisplaySettings] = useState(defaultSettings);

  return (
    <SettingsContext.Provider value={{ displaySettings, setDisplaySettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
