import store from "@/store";
import { move } from "@/store/curSlice";
import { want } from "@/unit";

export function Right() {
  const { dispatch } = store;
  const { cur: curData, matrix: matrixData } = store.getState();
  const { right } = curData;
  const next = right();
  if (next) {
    const canReach = want(next, matrixData);
    if (canReach) {
      dispatch(move(next));
    }
  }
}
