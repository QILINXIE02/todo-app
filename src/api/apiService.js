import axios from 'axios';

const API_URL = 'https://auth-api-todo.onrender.com/api/v1/';

export const getTodos = async () => {
  try {
    const response = await axios.get(`${API_URL}/todos`);
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

export const addTodo = async (todo) => {
  try {
    const response = await axios.post(`${API_URL}/todos`, todo);
    return response.data;
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error;
  }
};

export const deleteTodo = async (id) => {
  try {
    await axios.delete(`${API_URL}/todos/${id}`);
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};

export const updateTodo = async (id, updatedTodo) => {
  try {
    const response = await axios.put(`${API_URL}/todos/${id}`, updatedTodo);
    return response.data;
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};
