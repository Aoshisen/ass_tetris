import { List } from "immutable";
import { blockShape, origin } from "./const";

interface CreateBlockParam {
  type: keyof typeof blockShape;
  rotateIndex?: number;
  timeStamp?: number;
  shape?: number[][];
  xy?: [number, number];
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

  let result = {
    shape,
    type,
    xy,
    rotateIndex,
    timeStamp,
  };

  function createArray(length: number) {
    let result = [];
    for (let i = 0; i < length; i++) {
      result.push([]);
    }
    return result as number[][];
  }
  function rotate() {
    function getNextShape(shape: number[][]) {
      const maxY = shape.length - 1;
      const maxX = shape[0].length - 1;
      let result = createArray(maxX + 1);
      shape.forEach((rowData, y) => {
        rowData.forEach((colData, x) => {
          const nextX = maxY - 1 - x;
          const nextY = maxX - 1 - y;
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
        xy[0] + origin[type][rotateIndex][0],
        xy[1] + origin[type][rotateIndex][1],
      ];
      return result;
    }

    function getNextIndex(index: number) {
      console.log(index);
      const totalIndex = origin[type].length;
      const nextIndex = index + 1;
      return nextIndex > totalIndex ? 0 : nextIndex;
    }

    if (!(rotateIndex && xy && shape)) {
      return;
    }
    return {
      ...result,
      rotateIndex: getNextIndex(rotateIndex),
      xy: getNextXy(xy),
      shape: getNextShape(shape),
    };
  }
  function fall(n = 1) {
    console.log("fall", n);
  }
  function right() {
    console.log("right");
  }
  function left() {
    console.log("left");
  }

  return {
    ...result,
    rotate,
    fall,
    right,
    left,
  };
}

export { createBlock };
