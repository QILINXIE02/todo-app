import { useState } from 'react';
import { v4 as uuid } from 'uuid';

const useTodoList = () => {
  const [todoList, setTodoList] = useState([]);
  const [incompleteCount, setIncompleteCount] = useState(0);

  const addTodo = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newItem = {
      id: uuid(),
      text: formData.get('text'),
      assignee: formData.get('assignee'),
      difficulty: parseInt(formData.get('difficulty'), 10),
      complete: false
    };
    setTodoList([...todoList, newItem]);
  };

  const deleteTodo = (id) => {
    setTodoList(todoList.filter(item => item.id !== id));
  };

  const toggleComplete = (id) => {
    setTodoList(todoList.map(item => {
      if (item.id === id) {
        return { ...item, complete: !item.complete };
      }
      return item;
    }));
  };

  // Recalculate incomplete count whenever todoList changes
  useState(() => {
    const newIncompleteCount = todoList.filter(item => !item.complete).length;
    setIncompleteCount(newIncompleteCount);
  }, [todoList]);

  return { todoList, addTodo, deleteTodo, toggleComplete, incompleteCount };
};

export default useTodoList;
