import React, { useState } from 'react';
import './TodoItem.scss';
import classNames from 'classnames';
import { ITodo } from '../types/ITodo';
import { useTodos } from './hooks/useTodos';


export const TodoItem: React.FC<ITodo> = ({ id, title, completed }) => {
  const [editingTodo, setEditingTodo] = useState(false);
  const [initialTitle, setInitialTitle] = useState(title);
  const [updatedTitle, setUpdatedTitle] = useState(initialTitle);

  const content = useTodos();
  const todos = content?.todos;
  const setTodos = content?.setTodos;

  const removeTodo = (todoId: number): void => {
    if (todos && setTodos) {
      setTodos(todos.filter(todo => todo.id !== todoId));
    }
  };

  const toggleTodo = (todoId: number): void => {
    if (todos && setTodos) {
      setTodos(todos.map(todo => {
        if (todo.id === todoId) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }));
    }
  };

  const editTodo = (todoId: number): void => {
    if (todos && setTodos) {
      setTodos(todos.map(todo => {
        if (todo.id === todoId) {
          return {
            ...todo,
            title: updatedTitle,
          };
        }

        return todo;
      }));
    }
  };

  const updateTodo = (todoId: number): void => {
    setInitialTitle(updatedTitle);
    setEditingTodo(false);
    editTodo(todoId);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setUpdatedTitle(e.target.value);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        updateTodo(id);
        break;

      case 'Escape':
        setUpdatedTitle(initialTitle);
        setEditingTodo(false);
        break;

      default:
        setEditingTodo(true);
    }
  };

  return (
    <li className="todo-item">
      <div className="todo-item__part todo-item__part--left">
        <input
          id={id.toString()}
          type="checkbox"
          checked={completed}
          onChange={() => toggleTodo && toggleTodo(id)}
          className="todo-item__checkbox"
        />

        {editingTodo ? (
          <input
            type="text"
            value={updatedTitle}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            onBlur={() => updateTodo(id)}
            className="todo-item__input input"
            autoFocus
          />
        ) : (
          <label htmlFor={id.toString()} className="todo-item__checkbox-label">
            <p className={classNames('todo-item__title',
              { 'todo-item__title--completed': completed })}
            >
              {initialTitle}
            </p>
          </label>
        )}
      </div>

      <div className="todo-item__part todo-item__part--right">
        <button
          type="button"
          onClick={() => setEditingTodo(true)}
          className="todo-item__button button is-info is-small"
          disabled={editingTodo}
        >
          <i className="fas fa-pencil" />
        </button>
        <button
          type="button"
          onClick={() => removeTodo(id)}
          className="todo-item__button button is-small is-danger"
        >
          <i className="fas fa-trash" />
        </button>
      </div>
    </li>
  );
};
