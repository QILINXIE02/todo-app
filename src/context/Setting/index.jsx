import React, { createContext, useState } from 'react';

export const SettingsContext = createContext();

const SettingsProvider = ({ children }) => {
  const [displaySettings, setDisplaySettings] = useState({
    hideCompleted: false,
    itemsPerPage: 3,
    sortWord: 'difficulty',
  });

  return (
    <SettingsContext.Provider value={{ displaySettings, setDisplaySettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
