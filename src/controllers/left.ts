import store from "@/store";
import { move } from "@/store/curSlice";
import { want } from "@/unit";

export function Left() {
  const { dispatch } = store;
  const { cur: curData, matrix: matrixData } = store.getState();
  const { left } = curData;
  const next = left();
  if (next) {
    const canReach = want(next, matrixData);
    if (canReach) {
      dispatch(move(next));
    }
  }
}
