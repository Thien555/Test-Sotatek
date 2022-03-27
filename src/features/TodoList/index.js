import React, { useState, useEffect, useMemo } from "react";
import "./styles.css";
import { useSelector, useDispatch } from "react-redux";
import { deleteMultiTodo } from "../../redux/todoReducer";
import TodoItem from "./components/todoItem";

const TodoList = () => {
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todo.todoList);
  const [filterTodos, setFilterTodos] = useState(todoList);
  const checkedList = useSelector((state) => state.todo.checkedList);
  const [searchText, setSearchText] = useState("");
  console.log("thien", todoList);

  const sortedTodoList = useMemo(() => {
    let newTodoList = [...filterTodos];
    return newTodoList.sort(
      (itemA, itemB) => new Date(itemA.time) - new Date(itemB.time)
    );
  }, [filterTodos]);
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    setFilterTodos(
      todoList.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, todoList, dispatch]);

  return (
    <div className="container">
      <h1>To Do List</h1>
      <input
        type="text"
        placeholder="Search ..."
        className="search-input"
        onChange={handleSearch}
        value={searchText}
      />
      <div className="list-item">
        {sortedTodoList.map((item) => (
          <TodoItem item={item} key={item.id} />
        ))}
      </div>
      {checkedList.length > 0 && (
        <div className="bulk-action">
          <p>Bulk Action</p>
          <div className="action-btns">
            <button className="done-btn">Done</button>
            <button
              className="bulk-remove-btn"
              onClick={() => dispatch(deleteMultiTodo())}
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
