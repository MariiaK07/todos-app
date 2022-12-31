import React, { createContext, useEffect, useState } from 'react';
import { ITodo } from '../../types/ITodo';


type GlobalContent = {
  todos: ITodo[],
  setTodos: (todos: ITodo[]) => void;
  filteredTodos: ITodo[];
  setFilteredTodos: (filteredTodos: ITodo[]) => void;
};

type TodosProviderProps = {
  children: React.ReactNode;
};


export const TodosContext = createContext<GlobalContent | null>(null);


const getTodosFromLocalStorage =() => {
  const savedTodos = localStorage.getItem('todos');
  const localTodos = savedTodos && JSON.parse(savedTodos);

  return localTodos || [];
};


export const TodosProvider = (props: TodosProviderProps) => {
  const [todos, setTodos] = useState<ITodo[]>(getTodosFromLocalStorage);
  const [filteredTodos, setFilteredTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    setTodos(getTodosFromLocalStorage());
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    setFilteredTodos(todos);
  }, [todos]);

  return (
    <TodosContext.Provider value={{
      todos,
      setTodos,
      filteredTodos,
      setFilteredTodos,
    }}
    >
      {props.children}
    </TodosContext.Provider>
  );
};
