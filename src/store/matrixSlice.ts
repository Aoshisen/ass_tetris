import { createSlice } from "@reduxjs/toolkit";
import { blankMatrix } from "@/unit";
import { List } from "immutable";

export const matrixSlice = createSlice({
  name: "matrix",
  initialState: blankMatrix,
  reducers: {
    changeTo: (_, { payload }) => {
      const payloadState = List(payload);
      return payloadState.toJS();
    },
  },
});

export const { changeTo } = matrixSlice.actions;

export default matrixSlice.reducer;
