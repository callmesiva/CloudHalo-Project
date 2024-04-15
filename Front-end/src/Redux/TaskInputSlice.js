import { createSlice } from "@reduxjs/toolkit";

const TaskInputSlice = createSlice({
  name: "taskInput",
  initialState: {
    backupTasks: [],
    tasks: [],
    completed: [],
    edit: [],
    notes: {},
    notific: [],
  },
  reducers: {
    addTask: (state, action) => {
      const payload = action.payload;
      if (payload[0] == "okay") {
        state.tasks = [...payload[1]];
      } else {
        if (Array.isArray(payload)) {
          const filteredPayload = payload.filter((item) => !item.marks);
          state.tasks = [...filteredPayload];
        } else {
          state.tasks.push(payload);
          state.backupTasks.push(payload);
        }
      }
    },
    editTask: (state, action) => {
      if (action.payload == true) state.edit = [];
      else state.edit.push(action.payload);
    },
    deleteTask: (state, action) => {
      const idToDelete = action.payload;
      state.tasks = state.tasks.filter((task) => task._id !== idToDelete);
      state.notes = idToDelete == state.notes._id ? {} : state.notes;
    },
    addDetailsData: (state, action) => {
      const payload = action.payload;
      if (Array.isArray(payload)) {
        const firstUnmarked = payload.find((item) => !item.marks);
        state.notes = firstUnmarked || {};
      } else state.notes = action.payload;
    },
    addNotes: (state, action) => {
      const [updatedTask, newNote] = action.payload;

      const updatedTasks = state.tasks.map((task) => {
        if (task._id === updatedTask._id) {
          return {
            ...task,
            notes: [...task.notes, newNote],
          };
        }
        return task;
      });
      const updatedTasks1 = state.backupTasks.map((task) => {
        if (task._id === updatedTask._id) {
          return {
            ...task,
            notes: [...task.notes, newNote],
          };
        }
        return task;
      });

      state.backupTasks = updatedTasks1;
      state.tasks = updatedTasks;

      state.notes.notes.push(newNote);
    },
    deleteNotes: (state, action) => {
      state.notes.notes;
    },
    backedTask: (state, action) => {
      const payload = action.payload;
      if (Array.isArray(payload)) {
        state.backupTasks = [...payload];
      }
    },
    backedTaskDelete: (state, action) => {
      const idToDelete = action.payload;
      state.backupTasks = state.backupTasks.filter(
        (task) => task._id !== idToDelete
      );
    },

    addNotific: (state, action) => {
      state.notific.push(action.payload);
    },
  },
});

export const {
  addTask,
  editTask,
  deleteTask,
  addDetailsData,
  addNotes,
  backedTask,
  backedTaskDelete,
  addNotific,
} = TaskInputSlice.actions;
export default TaskInputSlice.reducer;
