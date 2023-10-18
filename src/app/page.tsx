'use client'

import React, { useEffect, useState } from 'react';
import { Indie_Flower, Shadows_Into_Light } from '@next/font/google';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";

const indie = Indie_Flower({
  subsets: ['latin'],
  weight: ['400']
});

const shadows = Shadows_Into_Light({
  subsets: ['latin'],
  weight: ['400']
});

function App() {
  const [todos, setTodos] = useState<string[]>([]);
  const [todoInput, setTodoInput] = useState<string>('');
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    getTodos();
  }, []);

  const addTodo = (event: React.FormEvent) => {
    event.preventDefault();
    if (todoInput.trim() !== '') {
      const newTodos = [...todos, { text: todoInput, completed: false }];
      setTodos(newTodos);
      saveLocalTodos(newTodos);
      setTodoInput('');
    }
  };

  const deleteTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    removeLocalTodos(newTodos);
  };

  const completeTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
    saveLocalTodos(newTodos);
  };

  const getTodos = () => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  };

  const saveLocalTodos = (todosToSave: string[]) => {
    localStorage.setItem('todos', JSON.stringify(todosToSave));
  };

  const removeLocalTodos = (todosToRemove: string[]) => {
    localStorage.setItem('todos', JSON.stringify(todosToRemove));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true;
    if (filter === 'completed' && todo.completed) return true;
    if (filter === 'uncompleted' && !todo.completed) return true;
    return false;
  });

  return (
    <div className="App">
      <header className={indie.className}>
        <h1>Ori&#39;s Todo list</h1>
      </header>
      <form onSubmit={addTodo}>
        <input
          type="text"
          className="todo-input"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
        />
        <button className="todo-button" type="submit">
          <FontAwesomeIcon icon={faPlusSquare} />
        </button>
        <div className="select">
          <select
            name="todos"
            className="filter-todo"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>
        </div>
      </form>
      <div className="todo-container">
        <ul className="todo-list">
          {filteredTodos.map((todo, index) => (
            <div key={index} className={`todo ${todo.deleted ? 'fall' : ''}`}>
              <li
                className={
                  todo.completed
                    ? 'todo-item completed'
                    : `todo-item ${indie.className}`
                }
              >
                {todo.text}
              </li>
              <button className="complete-btn" onClick={() => completeTodo(index)}>
                <FontAwesomeIcon icon={faCheck} />
              </button>
              <button className="trash-btn" onClick={() => deleteTodo(index)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
