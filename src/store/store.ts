import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./taskSlice";

export const store = configureStore({
  reducer: {
    tasks: taskSlice,
  },
});

// What this thing does? Why do we need it?
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
