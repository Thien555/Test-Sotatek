import { createSlice } from "@reduxjs/toolkit";
import { getTodoList, removeTodoList, setTodoList } from "../utils";
import { DATA_MOCKS } from "../_mocks_/data";

const initialState = {
  todoList: getTodoList() ? getTodoList() : DATA_MOCKS,
  checkedList: [],
};
export const todoSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    deleteCheckedTodo: (state, action) => {
      state.checkedList = state.checkedList.filter(
        (id) => id !== action.payload.id
      );
    },

    deleteMultiTodo: (state) => {
      state.todoList = state.todoList.filter(
        (item) => !state.checkedList.includes(item.id)
      );
      state.checkedList = [];
      removeTodoList();
      setTodoList(state.todoList);
    },
    addTodo: (state, action) => {
      state.todoList.push(action.payload);
      removeTodoList();
      setTodoList(state.todoList);
    },

    deleteTodo: (state, action) => {
      state.todoList = state.todoList.filter(
        (todo) => todo.id !== action.payload.id
      );
      removeTodoList();
      setTodoList(state.todoList);
    },

    updateTodo: (state, action) => {
      state.todoList = state.todoList.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, ...action.payload.task };
        }
        return item;
      });
    },

    addCheckedTodo: (state, action) => {
      state.checkedList.push(action.payload.id);
    },
  },
});
const { reducer, actions } = todoSlice;
export const {
  addTodo,
  deleteTodo,
  updateTodo,
  addCheckedTodo,
  deleteCheckedTodo,
  deleteMultiTodo,
} = actions;
export default reducer;
