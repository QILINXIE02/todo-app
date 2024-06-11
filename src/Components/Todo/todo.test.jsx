import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Todo from './Todo';
import { SettingsProvider } from '../../context/Setting'; // Ensure correct path to SettingsProvider
import * as apiService from '../../api/apiService'; // Import the API service for mocking

// Mock the API service functions
jest.mock('../../api/apiService');

const mockTodos = [
  { id: 1, itemtodo: 'Task 1', name: 'User 1', complete: false, difficulty: 3 },
  { id: 2, itemtodo: 'Task 2', name: 'User 2', complete: true, difficulty: 2 },
];

beforeEach(() => {
  // Reset the mock implementation before each test
  apiService.getTodos.mockResolvedValue(mockTodos);
  apiService.addTodo.mockImplementation((newTodo) => Promise.resolve({ ...newTodo, id: Date.now() }));
  apiService.deleteTodo.mockResolvedValue({});
  apiService.updateTodo.mockResolvedValue({});
});

test('renders Todo component without crashing', () => {
  render(
    <SettingsProvider>
      <Todo />
    </SettingsProvider>
  );
});

test('loads and displays todos', async () => {
  render(
    <SettingsProvider>
      <Todo />
    </SettingsProvider>
  );

  expect(await screen.findByText(/Task 1/)).toBeInTheDocument();
  expect(await screen.findByText(/Task 2/)).toBeInTheDocument();
});

test('adds a new todo', async () => {
  render(
    <SettingsProvider>
      <Todo />
    </SettingsProvider>
  );

  fireEvent.change(screen.getByPlaceholderText('Item Details'), { target: { value: 'New Task' } });
  fireEvent.change(screen.getByPlaceholderText('Assignee Name'), { target: { value: 'New User' } });
  fireEvent.click(screen.getByText('Add To Do Item'));

  expect(await screen.findByText('New Task')).toBeInTheDocument();
});

test('toggles todo completion status', async () => {
  render(
    <SettingsProvider>
      <Todo />
    </SettingsProvider>
  );

  const toggleButton = await screen.findByText('Pending');
  fireEvent.click(toggleButton);

  expect(apiService.updateTodo).toHaveBeenCalled();
  expect(toggleButton).toHaveTextContent('Complete');
});

test('deletes a todo', async () => {
  render(
    <SettingsProvider>
      <Todo />
    </SettingsProvider>
  );

  const deleteButton = await screen.findByText('X');
  fireEvent.click(deleteButton);

  expect(apiService.deleteTodo).toHaveBeenCalled();
  expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
});
