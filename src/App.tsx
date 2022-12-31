import React from 'react';
import './App.scss';
import 'bulma';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodosProvider } from './components/hoc/TodosProvider';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { TodoStatistics } from './components/TodoStatistics';


export const App: React.FC = () => (
  <TodosProvider>
    <div className="app">
      <header className="app__header">
        <h1 className="app__header-title">
          TODOS
        </h1>
      </header>
      <div className="app__todos">
        <TodoForm />
        <TodoList />
        <TodoStatistics />
      </div>
    </div>
  </TodosProvider>
);

export default App;
