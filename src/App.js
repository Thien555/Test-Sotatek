import React from "react";
import "./App.css";
import CreatTaskForm from "./features/CreateTaskForm";
import TodoList from "./features/TodoList";
function App() {
  return (
    <div className="App">
      <div className="app">
        <div className="left-content">
          <CreatTaskForm />
        </div>
        <div className="right-content">
          <TodoList />
        </div>
      </div>
    </div>
  );
}

export default App;
