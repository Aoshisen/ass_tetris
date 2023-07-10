import { createSlice } from "@reduxjs/toolkit";
import { List } from "immutable";

export const curSlice = createSlice({
  name: "cur",
  initialState: {},
  reducers: {
    move: (_, { payload }) => {
      const payloadState = List(payload);
      return payloadState.toJS();
    },
  },
});

export const { move } = curSlice.actions;

export default curSlice.reducer;
