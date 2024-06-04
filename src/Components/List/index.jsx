import React, { useContext } from 'react';
import { SettingsContext } from '../../context/Settings';

const List = ({ items }) => {
  const { displaySettings } = useContext(SettingsContext);
  const { itemsPerPage } = displaySettings;

  const paginatedItems = items.slice(0, itemsPerPage);

  return (
    <div>
      {paginatedItems.map(item => (
        <div key={item.id}>
          {/* Display item details */}
          <p>{item.text}</p>
          <p>Assigned To: {item.assignee}</p>
          <p>Difficulty: {item.difficulty}</p>
          <p>Complete: {item.complete.toString()}</p>
          <hr />
        </div>
      ))}
      {/* Pagination component here */}
    </div>
  );
};

export default List;
