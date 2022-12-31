import React, { useState, useEffect, useRef } from 'react';
import './TodoForm.scss';
import classNames from 'classnames';
import { useTodos } from './hooks/useTodos';


export const TodoForm: React.FC = () => {
  const [value, setValue] = useState('');
  const [areAllCompleted, setAreAllCompleted] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const content = useTodos();
  const todos = content?.todos;
  const setTodos = content?.setTodos;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (todos) {
      setAreAllCompleted(todos.every(todo => todo.completed === true));
    }
  }, [todos]);

  const addTodo = () => {
    if (value && todos && setTodos) {
      setTodos([...todos, {
        id: Date.now(),
        title: value,
        completed: false,
      }]);

      setValue('');
    }
  };

  const toggleAll = () => {
    if (todos && setTodos) {
      setTodos(
        todos.map(todo => {
          return { ...todo, completed: !areAllCompleted };
        }),
      );
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTodo();
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    addTodo();
  };

  return (
    <form
      className="todo-form"
      onSubmit={handleSubmit}
      style={todos && todos.length > 0
        ? { marginBottom: '24px' }
        : { marginBottom: '0' }}
    >
      {todos && todos.length > 0 && (
        <button
          data-tooltip={areAllCompleted ? 'Unselect all' : 'Select all'}
          type="button"
          onClick={toggleAll}
          className={classNames(
            'todo-form__button', 
            'todo-form__button--left', {
              'todo-form__button--left--toggled': areAllCompleted,
            },
            'has-tooltip-arrow',
            'has-tooltip-text-centered',
          )}
        >
          <i className="fa-solid fa-check todo-form__icon" />
        </button>
      )}

      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        placeholder="Type your todo here..."
        className="todo-form__input input is-success"
      />

      {value.length > 0 && (
        <button
          type="submit"
          className="todo-form__button todo-form__button--right button is-success"
        >
          <i className="fa-solid fa-plus todo-form__icon" />
        </button>
      )}
    </form>
  );
};
