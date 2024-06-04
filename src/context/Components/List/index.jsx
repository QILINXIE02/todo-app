import React, { useContext } from 'react';
import { SettingsContext } from '../../context/Setting';

const List = ({ list, toggleComplete }) => {
  const { displaySettings } = useContext(SettingsContext);

  return (
    <>
      {list.slice(0, displaySettings.itemsPerPage).map(item => (
        <div key={item.id}>
          <p>{item.text}</p>
          <p><small>Assigned to: {item.assignee}</small></p>
          <p><small>Difficulty: {item.difficulty}</small></p>
          <div onClick={() => toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
          <hr />
        </div>
      ))}
      {/* Pagination component here */}
    </>
  );
};

export default List;
