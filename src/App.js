import React from 'react';
import './App.css'; // Assuming you have an App.css file for styling
import { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]); // Array to store todo items
  const [todo, setTodo] = useState('');  // String to hold the current todo text

  const addTodo = () => {
    // Prevent empty todos from being added
    if (todo.trim()) { // Check for non-empty trimmed todo text
      setTodos([...todos, { text: todo, status: false, id: Date.now() }]); // Add new todo object
      setTodo(''); // Clear the input field after adding
    }
  };

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's Wednesday ☕ </h2>
      </div>
      <div className="input">
        <input
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          type="text"
          placeholder="️ Add item..."
        />
        <i onClick={addTodo} className="fas fa-plus"></i>
      </div>
      <div className="todos">
        {todos.map((obj) => (
          <div className="todo" key={obj.id}>
            <div className="left">
              <input
                type="checkbox"
                checked={obj.status}
                onChange={(e) => {
                  setTodos(todos.map((item) => 
                    item.id === obj.id ? { ...item, status: e.target.checked } : item
                  ));
                }}
              />
              <p>{obj.text}</p>
            </div>
            <div className="right">
              <i className="fas fa-times"></i> 
            </div>
          </div>
        ))}
        {todos.map((obj) => {
          if (obj.status) {
            return <h1 style={{color:'white'}} key={obj.id}>{obj.text}</h1>;
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
}

export default App;
