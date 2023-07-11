import { List } from "immutable";
import { CreateBlock } from ".";
import { blockType, StorageKey } from "./const";

export function toListData(array: number[][]) {
  let result = List<List<number>>([]);
  array.map((item, index: number) => {
    result = result.set(index, List(item));
  });
  return result;
}

export function getNextType() {
  const len = blockType.length;
  return blockType[Math.floor(Math.random() * len)];
}

export function want(next: ReturnType<CreateBlock>, matrix: number[][]) {
  // 方块是否能移到到指定位置
  const xy = next.xy || [0, 0];
  const shape = toListData(next.shape);
  const horizontal = shape.get(0)?.size || 0;
  let _matrix = toListData(matrix);
  return shape.every((m, k1) =>
    m.every((n, k2) => {
      if (xy[1] < 0) {
        // left
        return false;
      }
      if (xy[1] + horizontal > 10) {
        // right
        return false;
      }
      if (xy[0] + k1 < 0) {
        // top
        return true;
      }
      if (xy[0] + k1 >= 20) {
        // bottom
        return false;
      }
      if (n) {
        if (_matrix.get(xy[0] + k1)?.get(xy[1] + k2)) {
          return false;
        }
        return true;
      }
      return true;
    })
  );
}

export function isClear(matrix: number[][]) {
  // 是否达到消除状态
  const clearLines: any = [];
  matrix.forEach((m, k) => {
    if (m.every((n) => !!n)) {
      clearLines.push(k);
    }
  });
  if (clearLines.length === 0) {
    return false;
  }
  return clearLines;
}

export function isOver(matrix: number[][]) {
  // 游戏是否结束, 第一行落下方块为依据
  let _matrix = toListData(matrix);
  return _matrix.get(0)?.some((n) => !!n);
}

export function subscribeRecord(store: any) {
  // 将状态记录到 localStorage
  store.subscribe(() => {
    let data = store.getState().toJS();
    if (data.lock) {
      // 当状态为锁定, 不记录
      return;
    }
    data = JSON.stringify(data);
    data = encodeURIComponent(data);
    data = btoa(data);
    localStorage.setItem(StorageKey, data);
  });
}

export function isMobile() {
  // 判断是否为移动端
  const ua = navigator.userAgent;
  const android = /Android (\d+\.\d+)/.test(ua);
  const iphone = ua.indexOf("iPhone") > -1;
  const ipod = ua.indexOf("iPod") > -1;
  const ipad = ua.indexOf("iPad") > -1;
  const nokiaN = ua.indexOf("NokiaN") > -1;
  return android || iphone || ipod || ipad || nokiaN;
}
