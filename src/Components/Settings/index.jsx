import React, { useContext, useState } from 'react';
import { SettingsContext } from '../../context/Setting';
import './settings.scss';

const Settings = () => {
  const { displaySettings, setDisplaySettings } = useContext(SettingsContext);
  const [showCompleted, setShowCompleted] = useState(displaySettings.hideCompleted);
  const [itemsPerPage, setItemsPerPage] = useState(displaySettings.itemsPerPage);
  const [sortWord, setSortWord] = useState(displaySettings.sortWord);
  const [updatedSettings, setUpdatedSettings] = useState(null);

  const handleSubmit = () => {
    setDisplaySettings({
      hideCompleted: showCompleted,
      itemsPerPage,
      sortWord,
    });
    setUpdatedSettings({ showCompleted, itemsPerPage, sortWord });
  };

  return (
    <div className="settings">
      <h2>Manage Settings</h2>
      <div className="settings-group">
        <label>
          Show Completed ToDos
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={(event) => setShowCompleted(event.currentTarget.checked)}
          />
        </label>
        <label>
          Items Per Page
          <input
            type="number"
            value={itemsPerPage}
            onChange={(event) => setItemsPerPage(Number(event.currentTarget.value))}
            min="1"
            max="10"
          />
        </label>
        <label>
          Sort Keyword
          <input
            type="text"
            value={sortWord}
            onChange={(event) => setSortWord(event.currentTarget.value)}
          />
        </label>
        <button onClick={handleSubmit} style={{ backgroundColor: 'rgb(56, 117, 240)' }}>
          Update Settings
        </button>
        {updatedSettings && (
          <div className="updated-settings">
            <p>Updated Settings:</p>
            <p>Show Completed ToDos: {updatedSettings.showCompleted ? 'Yes' : 'No'}</p>
            <p>Items Per Page: {updatedSettings.itemsPerPage}</p>
            <p>Sort Keyword: {updatedSettings.sortWord}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
