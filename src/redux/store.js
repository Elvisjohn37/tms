import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../components/task/slice";

let store = configureStore({
  reducer: {
    task: taskReducer
  },
});

export default store;
