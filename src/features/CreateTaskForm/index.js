import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../redux/todoReducer";
import "./styles.css";
const CreatTaskForm = () => {
  const dispatch = useDispatch();

  const [task, setTask] = useState({
    name: "",
    description: "",
    time: new Date().toISOString().substring(0, 10),
    priority: "Normal",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      new Date(task.time) < new Date(new Date().toISOString().substring(0, 10))
    ) {
      alert("Time must be more than current time at");
    } else {
      dispatch(addTodo({ ...task, id: Math.random() }));
    }
  };
  return (
    <div className="container">
      <h1 className="title">New Task</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          required
          placeholder="Add new task..."
          value={task.name}
          onChange={handleChange}
          className="add-task-input"
        />
        <div className="form-control">
          <label htmlFor="">Description</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            className="input-des"
          />
        </div>
        <div className="select-box">
          <div className="form-control">
            <label htmlFor="">Due date</label>
            <input
              type="date"
              name="time"
              value={task.time}
              onChange={handleChange}
              className="input-time"
            />
          </div>
          <div className="form-control">
            <label htmlFor="">Priority</label>
            <select
              name="priority"
              value={task.priority}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
        <button className="submit-btn">Add</button>
      </form>
    </div>
  );
};

export default CreatTaskForm;
