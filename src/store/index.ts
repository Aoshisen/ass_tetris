import { configureStore } from "@reduxjs/toolkit";

import matrixSlice from "./matrixSlice";
import curSlice from "./curSlice";

const store = configureStore({
  reducer: {
    matrix: matrixSlice,
    cur: curSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      //关闭序列化状态检测中间件
      serializableCheck: false,
    }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
