import React, { useContext } from 'react';
import { SettingsContext } from '../../context/Setting';
import { Pagination } from '@mantine/core';
import './lists.scss';

const List = ({ items }) => {
  const { displaySettings } = useContext(SettingsContext);
  const { itemsPerPage, hideCompleted } = displaySettings;
  const [currentPage, setCurrentPage] = React.useState(1);

  const filteredItems = hideCompleted ? items.filter(item => !item.complete) : items;
  const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div>
      {paginatedItems.map(item => (
        <div key={item.id}>
          <p>{item.text}</p>
          <p>Assigned To: {item.assignee}</p>
          <p>Difficulty: {item.difficulty}</p>
          <p>Complete: {item.complete.toString()}</p>
          <hr />
        </div>
      ))}
      <Pagination
        total={Math.ceil(filteredItems.length / itemsPerPage)}
        page={currentPage}
        onChange={setCurrentPage}
      />
    </div>
  );
};

export default List;
