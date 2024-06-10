import React, { useContext, useState } from 'react';
import { SettingsContext } from '../../context/Setting';
import { Pagination, Button, Paper, Group, Text, Title } from '@mantine/core';
import './todo.scss';

const Todo = () => {
  const { displaySettings } = useContext(SettingsContext);
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newTodo, setNewTodo] = useState({ item: '', assignee: '', difficulty: 1 });
  const itemsPerPage = displaySettings.itemsPerPage;

  const handleAddTodo = () => {
    setTodos([...todos, { ...newTodo, complete: false }]);
    setNewTodo({ item: '', assignee: '', difficulty: 1 });
  };

  const handleCompleteToggle = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].complete = !updatedTodos[index].complete;
    setTodos(updatedTodos);
  };

  const handleRemoveTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const paginatedTodos = todos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="todo-container">
      <div className="add-todo">
        <Title order={3}>Add To Do Item</Title>
        <div className="form-group">
          <label>
            To Do Item
            <input
              type="text"
              value={newTodo.item}
              onChange={(e) => setNewTodo({ ...newTodo, item: e.target.value })}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Assigned To
            <input
              type="text"
              value={newTodo.assignee}
              onChange={(e) => setNewTodo({ ...newTodo, assignee: e.target.value })}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Difficulty
            <input
              type="number"
              min="1"
              max="5"
              value={newTodo.difficulty}
              onChange={(e) => setNewTodo({ ...newTodo, difficulty: e.target.value })}
            />
          </label>
        </div>
        <Button onClick={handleAddTodo}>Add To Do Item</Button>
      </div>

      <div className="todos">
        <Title order={3}>Pending Items</Title>
        {paginatedTodos
          .filter((todo) => !displaySettings.hideCompleted || !todo.complete)
          .map((todo, index) => (
            <Paper key={index} shadow="xs" padding="md" className="todo-item">
              <Group position="apart">
                <div>
                  <Button
                    color={todo.complete ? 'red' : 'green'}
                    onClick={() => handleCompleteToggle(index)}
                  >
                    {todo.complete ? 'Complete' : 'Pending'}
                  </Button>
                </div>
                <Button variant="outline" color="red" onClick={() => handleRemoveTodo(index)}>
                  X
                </Button>
              </Group>
              <Text>{todo.item}</Text>
              <Group position="apart">
                <Text>{todo.assignee}</Text>
                <Text>Difficulty: {todo.difficulty}</Text>
              </Group>
            </Paper>
          ))}
        <Pagination
          total={Math.ceil(todos.length / itemsPerPage)}
          page={currentPage}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Todo;
