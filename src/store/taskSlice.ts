import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types
export interface Task {
  taskName: string;
  taskID: number;
}

export interface TasksState {
  tasks: Task[];
}

// Set initialState
const initialState: TasksState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter(
        (task) => task.taskID !== action.payload
      );
    },
    editTask: (state, action: PayloadAction<Task>) => {
      // Find the task by the ID
      let taskToEdit = state.tasks.find(
        (task) => task.taskID === action.payload.taskID
      );

      //If it was a success, update the taskName
      if (taskToEdit) {
        taskToEdit.taskName = action.payload.taskName;
      }
    },
  },
});

export const { addTask, removeTask, editTask } = taskSlice.actions;
export default taskSlice.reducer;
