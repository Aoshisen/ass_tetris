import { List } from "immutable";

//一些图形的形状
const blockShape = {
  I: [[1, 1, 1, 1]],
  L: [
    [0, 0, 1],
    [1, 1, 1],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
  ],
};

//图形形状对应的type
const blockType = Object.keys(blockShape);

//下落的速度
const speeds = [800, 650, 500, 370, 250, 160];

//当一行全部填充上了
const fillLine = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

//当一行是空的
const blankLine = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

//定义初始的视图
const blankMatrix = List(Array(20).fill(blankLine) as number[][]);

//定义存在localStorage 里面数据的值
const StorageKey = "ASS_TETRIS";

//上一把的状态
const lastRecord = (() => {
  let data = localStorage.getItem(StorageKey);
  if (!data) {
    return false;
  }
  try {
    //对base64 字符串解码 （btoa 对base64 格式的数据编码）
    data = atob(data);
    data = decodeURIComponent(data);
    data = JSON.parse(data);
  } catch (e) {
    window.console.error("读取记录错误:", e);
    return false;
  }
  return data;
})();

//定义加快速度的节点
const clearPoints = [100, 300, 700, 1500];

//定义最大的分数
const maxPoint = 999999;

//每消除eachLine 行增加速度
const eachLine = 20;

//获取浏览器的参数
const getParam = (param: string) => {
  // 获取浏览器参数
  const r = new RegExp(`\\?(?:.+&)?${param}=(.*?)(?:&.*)?$`);
  const m = window.location.toString().match(r);
  return m ? decodeURI(m[1]) : "";
};

//浏览器当前的语言
// const lan = (() => {
//   let l = getParam('lan').toLowerCase();
//   l = i18n.lan.indexOf(l) === -1 ? i18n.default : l;
//   return l;
// })();

// document.title = i18n.data.title[lan];

// const transform = (function () {
//   const trans = ['transform', 'webkitTransform', 'msTransform', 'mozTransform', 'oTransform'];
//   const body = document.body;
//   return trans.filter((e) => body.style[e] !== undefined)[0];
// }());
const origin = {
  I: [
    [-1, 1],
    [1, -1],
  ],
  L: [[0, 0]],
  J: [[0, 0]],
  Z: [[0, 0]],
  S: [[0, 0]],
  O: [[0, 0]],
  T: [
    [0, 0],
    [1, 0],
    [-1, 1],
    [0, -1],
  ],
};

export {
  blockShape,
  blockType,
  speeds,
  fillLine,
  blankLine,
  blankMatrix,
  StorageKey,
  lastRecord,
  clearPoints,
  maxPoint,
  eachLine,
  getParam,
  origin,
};
