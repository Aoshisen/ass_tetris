import { blockShape, origin } from "./const";

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

function createBlock({
  type,
  rotateIndex,
  timeStamp,
  shape,
  xy,
}: CreateBlockParam) {
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
    switch (type) {
      //定义开始下落时的方块坐标
      case "I": // I
        xy = [0, 3];
        break;
      case "L": // L
        xy = [-1, 4];
        break;
      case "J": // J
        xy = [-1, 4];
        break;
      case "Z": // Z
        xy = [-1, 4];
        break;
      case "S": // S
        xy = [-1, 4];
        break;
      case "O": // O
        xy = [-1, 4];
        break;
      case "T": // T
        xy = [-1, 4];
        break;
      default:
        break;
    }
  }

  let data = {
    shape,
    type,
    xy,
    rotateIndex,
    timeStamp,
  };

  const method = {
    rotate,
    fall,
    right,
    left,
  };
  const result = { ...method, ...data };
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
      console.log(origin[type][rotateIndex], rotateIndex, type);
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
    return {
      ...result,
      rotateIndex: (rotateIndex = getNextIndex(rotateIndex)),
      xy: (xy = getNextXy(xy)),
      shape: (shape = getNextShape(shape)),
    };
  }
  function fall(n = 1) {
    if (!xy) {
      return;
    }
    //更新timeStamp;
    return {
      ...result,
      xy: (xy = [xy[0] + n, xy[1]]),
      timeStamp: (timeStamp = Date.now()),
    };
  }
  function right() {
    if (!xy) {
      return;
    }
    return {
      ...result,
      xy: (xy = [xy[0], xy[1] + 1]),
    };
  }
  function left() {
    if (!xy) {
      return;
    }
    return {
      ...result,
      xy: (xy = [xy[0], xy[1] - 1]),
    };
  }

  return result;
}

type CreateBlock = typeof createBlock;

export { createBlock };

export type { CreateBlock, CreateBlockParam };
