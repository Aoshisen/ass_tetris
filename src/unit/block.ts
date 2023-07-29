import { beginPoints, blockShape, origin } from "./const";
interface CreateBlockParam {
  type: keyof typeof blockShape;
  rotateIndex?: number;
  timeStamp?: number;
  shape?: number[][];
  xy?: [number, number];
}
function createArray(length: number) {
  let result = [];
  for (let i = 0; i < length; i++) {
    result.push([]);
  }
  return result as number[][];
}
function initParams(params: CreateBlockParam) {
  let { type, rotateIndex, timeStamp, shape, xy } = params;

  if (!rotateIndex) {
    rotateIndex = 0;
  }

  if (!timeStamp) {
    timeStamp = Date.now();
  }

  if (!shape) {
    shape = blockShape[type].map((e) => e);
  }

  if (!xy) {
    xy = beginPoints[type];
  }

  return { type, rotateIndex, timeStamp, shape, xy };
}
function createBlock(_initParams: CreateBlockParam) {
  const params = initParams(_initParams);
  const { type, rotateIndex, shape, xy }=params
  const methods={rotate,fall,right,left}
  function rotate() {
    function getNextShape(shape: number[][]) {
      const maxY = shape.length - 1;
      const maxX = shape[0].length - 1;
      let result = createArray(maxX + 1);
      shape.forEach((rowData, y) => {
        rowData.forEach((colData, x) => {
          const nextX = x;
          const nextY = maxY - y;
          result[nextX][nextY] = colData;
        });
      });
      return result;
    }
    function getNextXy(xy: [number, number]) {
      //得到旋转后的图标的起始坐标
      //注意： 这里的xy[0] 对应的是竖坐标，xy[1]对应的是横坐标
      if (typeof rotateIndex === "undefined") {
        return;
      }
      const result = [
        xy[0] + origin[type][rotateIndex][1],
        xy[1] + origin[type][rotateIndex][0],
      ];
      return result as [number, number];
    }
    function getNextIndex(index: number) {
      const totalIndex = origin[type].length - 1;
      const nextIndex = index + 1;
      return nextIndex > totalIndex ? 0 : nextIndex;
    }
    if (!(rotateIndex !== undefined && xy && shape)) {
      return;
    }
    const nextParams = {
      ...params,
      rotateIndex: getNextIndex(rotateIndex),
      xy: getNextXy(xy),
      shape: getNextShape(shape),
    };
    return createBlock(nextParams);
  }
  function fall(n = 1) {
    if (!xy) {
      return;
    }
    const nextParams = {
      ...params,
      xy: [xy[0] + n, xy[1]] as [number, number],
      timeStamp: Date.now(),
    };
    return createBlock(nextParams);
  }
  function right() {
    if (!xy) {
      return;
    }
    const nextParams = {
      ...params,
      xy: [xy[0], xy[1] + 1] as [number, number],
    };
    return createBlock(nextParams);
  }
  function left() {
    if (!xy) {
      return;
    }
    const nextParams = {
      ...params,
      xy: [xy[0], xy[1] - 1] as [number, number],
    };
    return createBlock(nextParams);
  }
  return { ...params, ...methods };
}
type CreateBlock = typeof createBlock;
export { createBlock };
export type { CreateBlock, CreateBlockParam };
