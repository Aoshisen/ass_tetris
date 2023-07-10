import { createBlock } from "@/unit";
import { createSlice } from "@reduxjs/toolkit";

export const curSlice = createSlice({
  name: "cur",
  initialState: createBlock({ type: "S" }),
  reducers: {
    move: (_, { payload }) => {
      return payload;
    },
  },
});

export const { move } = curSlice.actions;

export default curSlice.reducer;
