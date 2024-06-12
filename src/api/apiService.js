import axios from 'axios';

const API_BASE_URL = 'https://auth-api-todo.onrender.com/api/v1'; // Replace with your API base URL

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to fetch all todos
export const getTodos = async () => {
  try {
    const response = await axiosInstance.get('/todos');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to add a new todo
export const addTodo = async (todoData) => {
  try {
    const response = await axiosInstance.post('/todos', todoData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to update a todo (mark as complete)
export const updateTodo = async (id, todoData) => {
  try {
    const response = await axiosInstance.put(`/todos/${id}`, todoData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to delete a todo
export const deleteTodo = async (id) => {
  try {
    const response = await axiosInstance.delete(`/todos/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
