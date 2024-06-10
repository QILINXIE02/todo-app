import React, { useEffect, useState, useContext } from 'react';
import { v4 as uuid } from 'uuid';
import { SettingsContext } from '../../context/Setting';
import { Pagination, Button, Paper, Group, Text, Title } from '@mantine/core';
import './todo.scss';
import useForm from '../../hooks/form';

const Todo = () => {
  const { displaySettings } = useContext(SettingsContext);
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = displaySettings.itemsPerPage;
  const defaultValues = { difficulty: 4 };
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter((item) => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {
    const items = list.map((item) => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });
    setList(items);
  }

  useEffect(() => {
    let incompleteCount = list.filter((item) => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list, incomplete]);

  const paginatedTodos = list.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="todo-container">
      <header data-testid="todo-header">
        <h1 data-testid="todo-h1">To Do List: {incomplete} items pending</h1>
      </header>

      <div className="add-todo">
        <Title order={3}>Add To Do Item</Title>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              To Do Item
              <input
                type="text"
                name="text"
                placeholder="Item Details"
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Assigned To
              <input
                type="text"
                name="assignee"
                placeholder="Assignee Name"
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Difficulty
              <input
                type="range"
                min="1"
                max="5"
                name="difficulty"
                defaultValue={defaultValues.difficulty}
                onChange={handleChange}
              />
            </label>
          </div>
          <Button type="submit">Add To Do Item</Button>
        </form>
      </div>

      <div className="todos">
        <Title order={3}>Pending Items</Title>
        {paginatedTodos
          .filter((todo) => !displaySettings.hideCompleted || !todo.complete)
          .map((todo) => (
            <Paper key={todo.id} shadow="xs" padding="md" className="todo-item">
              <Group position="apart">
                <div>
                  <Button
                    color={todo.complete ? 'red' : 'green'}
                    onClick={() => toggleComplete(todo.id)}
                  >
                    {todo.complete ? 'Complete' : 'Pending'}
                  </Button>
                </div>
                <Button variant="outline" color="red" onClick={() => deleteItem(todo.id)}>
                  X
                </Button>
              </Group>
              <Text>{todo.text}</Text>
              <Group position="apart">
                <Text>{todo.assignee}</Text>
                <Text>Difficulty: {todo.difficulty}</Text>
              </Group>
            </Paper>
          ))}
        <Pagination
          total={Math.ceil(list.length / itemsPerPage)}
          page={currentPage}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Todo;
