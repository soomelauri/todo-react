import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
    });

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  }

  const toggleComplete = (id) => {
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        return {...todo, completed: !todo.completed};
      }
      return todo;
    }));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="App">
      <h1>My ToDo List</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value = {inputValue}
          onChange = {(event) => setInputValue(event.target.value)}
          placeholder = "Add a new task ..."
          />
          <button type="submit">Add</button>
      </form>

      <ul className="todo-list">
        {todos.length === 0 ? (
          <p className="empty-message"> Your todo-list is empty. Add some tasks!</p>
        ) : 
          (todos.map((todo) => (
            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
              <div className="todo-text" onClick={() => toggleComplete(todo.id)}>
                {todo.text}
              </div>
              <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
                Delete
              </button>
            </li>
          )))}
      </ul>

      {todos.length > 0 && (
        <div className = "todo-stats">
          <p> Total: {todos.length} Tasks.</p>
          <p> Completed: {todos.filter(todo => todo.completed).length} tasks.</p>
        </div>
      )}
    </div>
  );
}

export default App;
