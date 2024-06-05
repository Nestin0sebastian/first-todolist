import React, { useState } from 'react';
import './App.css';
import { format } from 'date-fns';
import { IoMdCheckmark, IoMdTrash } from 'react-icons/io';

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');

  const addTodo = () => {
    if (todo.trim()) {
      const now = new Date();
      setTodos([...todos, { text: todo, status: false, id: Date.now(), createdAt: now }]);
      setTodo('');
    }
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, deleting: true } : todo
    );
    setTodos(updatedTodos);
    setTimeout(() => {
      setTodos(updatedTodos.filter(todo => todo.id !== id));
    }, 1000);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, status: !todo.status, completedAt: todo.status ? null : new Date() } : todo
    ));
  };

  return (
    <div className="app">
      <div className="main-heading">
        <h1>Just Do It!</h1>
      </div>
      <div className="input-container">
        <div className="input">
          <input
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            type="text"
            placeholder="️ Add item..."
          />
          <button onClick={addTodo} className="add-btn">Add</button>
        </div>
      </div>
      <div className="todo-container">
        <div className="todos">
          <h3>Tasks</h3>
          {todos.filter(todo => !todo.status).map((obj) => (
            <div className={`todo ${obj.deleting ? 'deleting' : ''}`} key={obj.id} id={obj.id}>
              <div className="left">
                <div className="text">
                  <p>{obj.text}</p>
                  <span className="date">Created at: {format(new Date(obj.createdAt), 'dd/MM/yyyy HH:mm')}</span>
                </div>
              </div>
              <div className="right">
                <IoMdCheckmark onClick={() => toggleTodo(obj.id)} className="tick-button" />
                <IoMdTrash onClick={() => deleteTodo(obj.id)} className="trash-button" />
              </div>
            </div>
          ))}
        </div>
        <div className="completed-todos">
          <h3>Completed Tasks</h3>
          {todos.filter(todo => todo.status).map((obj) => (
            <div className={`todo completed ${obj.deleting ? 'deleting' : ''}`} key={obj.id} id={obj.id}>
              <div className="left">
                <div className="text">
                  <p className="completed">{obj.text}</p>
                  {obj.completedAt && <span className="date">Completed at: {format(new Date(obj.completedAt), 'dd/MM/yyyy HH:mm')}</span>}
                </div>
              </div>
              <div className="right">
                <IoMdTrash onClick={() => deleteTodo(obj.id)} className="trash-button" style={{ color: 'red' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
