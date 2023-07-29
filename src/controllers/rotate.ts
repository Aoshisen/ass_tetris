import store from "@/store";
import { move } from "@/store/curSlice";
import { want } from "@/unit";

export function Rotate() {
  const { dispatch } = store;
  const { cur: curData, matrix: matrixData } = store.getState();
  const { rotate } = curData;
  const next = rotate();
  if (next) {
    const canReach = want(next, matrixData);
    if (canReach) {
      dispatch(move(next));
    }
  }
}
