import { configureStore } from "@reduxjs/toolkit";

import matrixSlice from "./matrixSlice";

const store = configureStore({
  reducer: {
    matrix: matrixSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
