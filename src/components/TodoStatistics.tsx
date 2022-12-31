import React from 'react';
import { useTodos } from './hooks/useTodos';
import './TodoStatistics.scss';
import { TodoFilter } from './TodoFilter';


export const TodoStatistics: React.FC = () => {
  const content = useTodos();
  const todos = content?.todos;
  const setTodos = content?.setTodos;

  const activeTodos = todos && todos.filter(todo => todo.completed === true).length;
  const completedTodos = todos && todos.some(todo => todo.completed === true);

  const removeCompletedTodos = () => {
    if (todos && setTodos) {
      setTodos(todos.filter(todo => todo.completed === false));
    }
  };

  return (
    <>
      {todos && todos.length > 0 && (
        <div className="todo-statistics">
          <span
            className="todo-statistics__count"
          >
            {activeTodos === 1 ? (
              `${activeTodos} todo left`
            ) : (
              `${activeTodos} todos left`
            )}
          </span>

          <TodoFilter />

          <button
            type="button"
            onClick={removeCompletedTodos}
            className="button is-small is-danger"
            disabled={!completedTodos}
          >
            Delete completed
          </button>
        </div>
      )}
    </>
  );
};
