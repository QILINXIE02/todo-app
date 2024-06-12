import React, { useEffect, useState, useContext } from 'react';
import { SettingsContext } from '../../context/Setting';
import { Pagination, Button, Paper, Group, Text, Title } from '@mantine/core';
import './todo.scss';
import { getTodos, addTodo as addTodoApi, deleteTodo as deleteTodoApi, updateTodo as updateTodoApi } from '../../api/apiService';
import Auth from '../auth/auth';

const Todo = () => {
  const { displaySettings } = useContext(SettingsContext);
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = displaySettings.itemsPerPage;
  const defaultValues = { difficulty: 4 };
  const [formData, setFormData] = useState(defaultValues);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const todos = await getTodos();
      setList(todos);
      const incompleteCount = todos.filter((item) => !item.complete).length;
      setIncomplete(incompleteCount);
      document.title = `To Do List: ${incomplete} items pending`;
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTodo = await addTodoApi(formData);
      setList([...list, newTodo]);
      const newIncompleteCount = incomplete + 1;
      setIncomplete(newIncompleteCount);
      setFormData(defaultValues);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await deleteTodoApi(id);
      const items = list.filter((item) => item.id !== id);
      setList(items);
      const newIncompleteCount = items.filter((item) => !item.complete).length;
      setIncomplete(newIncompleteCount);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const updatedItems = list.map((item) => {
        if (item.id === id) {
          item.complete = !item.complete;
          updateTodoApi(id, item);
        }
        return item;
      });
      setList(updatedItems);
      const newIncompleteCount = updatedItems.filter((item) => !item.complete).length;
      setIncomplete(newIncompleteCount);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const paginatedTodos = list.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <Auth capability="read">
      <div className="todo-container">
        <header className="header-section" data-testid="todo-header">
          <h1 data-testid="todo-h1">To Do List: {incomplete} items pending</h1>
        </header>

        <div className="content-section">
          <div className="add-todo">
            <Title order={3}>Add To Do Item</Title>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>
                  To Do Item
                  <input
                    type="text"
                    name="itemtodo"
                    value={formData.itemtodo}
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
                    name="name"
                    value={formData.name}
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
                    value={formData.difficulty}
                    onChange={handleChange}
                    className="difficulty-slider"
                  />
                </label>
              </div>
              <Button type="submit" className="add-todo-button">Add To Do Item</Button>
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
                        className="pending-button"
                        onClick={() => toggleComplete(todo.id)}
                      >
                        {todo.complete ? 'Complete' : 'Pending'}
                      </Button>
                    </div>
                    <Button variant="outline" color="red" onClick={() => deleteItem(todo.id)}>
                      X
                    </Button>
                  </Group>
                  <Text>To-do Task: {todo.itemtodo}</Text>
                  <Group position="apart">
                    <Text>Assignee: {todo.name}</Text>
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
      </div>
    </Auth>
  );
};

export default Todo;
