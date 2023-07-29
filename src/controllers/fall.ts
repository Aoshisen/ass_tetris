import store from "@/store";
import { move } from "@/store/curSlice";
import { want } from "@/unit";

export function Fall() {
  const { dispatch } = store;
  const { cur: curData, matrix: matrixData } = store.getState();
  const { fall } = curData;
  const next = fall();
  if (next) {
    const canReach = want(next, matrixData);
    if (canReach) {
      dispatch(move(next));
    }
  }
}
