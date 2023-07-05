import { reducerType } from "@unit/reducerType";
import { blankMatrix } from "@unit/const";

const initState = blankMatrix;
//   lastRecord && Array.isArray(lastRecord.matrix)
//     ? List(lastRecord.matrix.map((e) => List(e)))
//     : blankMatrix;

const matrix = (state = initState, action: { type: any; data: any }) => {
  switch (action.type) {
    case reducerType.MATRIX:
      return action.data;
    default:
      return state;
  }
};

export default matrix;
