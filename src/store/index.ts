import { configureStore } from "@reduxjs/toolkit";

import matrixSlice from "./matrixSlice";
import curSlice from "./curSlice";

const store = configureStore({
  reducer: {
    matrix: matrixSlice,
    cur: curSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
