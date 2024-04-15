import { configureStore } from "@reduxjs/toolkit";
import TaskInputSlice from "./TaskInputSlice";

const store = configureStore({
  reducer: {
    taskInput: TaskInputSlice,
  },
});

export default store;
