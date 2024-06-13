import axios from 'axios';

const API_URL = import.meta.env.API_BASE_URL; // Ensure this is correctly defined in your Vite environment

// Function to fetch todos from the server
export const getTodos = async () => {
  try {
    const response = await axios.get(`${API_URL}/todos`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Failed to fetch todos. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error; // Propagate the error to the caller
  }
};

// Function to add a new todo item
export const addTodo = async (todo) => {
  try {
    const response = await axios.post(`${API_URL}/todos`, todo, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error(`Failed to add todo. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error; // Propagate the error to the caller
  }
};

// Function to update an existing todo item
export const updateTodo = async (id, updatedTodo) => {
  try {
    const response = await axios.put(`${API_URL}/todos/${id}`, updatedTodo, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Failed to update todo ${id}. Status: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error updating todo ${id}:`, error);
    throw error; // Propagate the error to the caller
  }
};

// Function to delete an existing todo item
export const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Failed to delete todo ${id}. Status: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error deleting todo ${id}:`, error);
    throw error; // Propagate the error to the caller
  }
};

// Function to login user
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/signin`, credentials);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Login failed. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Login failed:', error);
    throw error; // Propagate the error to the caller
  }
};

// Function to register user
export const signup = async (userInfo) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userInfo);

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error(`Registration failed. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Registration failed:', error);
    throw error; // Propagate the error to the caller
  }
};
