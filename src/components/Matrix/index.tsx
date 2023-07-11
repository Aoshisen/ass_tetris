import { Blocks } from "@components";
import styles from "./index.module.scss";
import { useSelector, useDispatch } from "react-redux";

import { changeTo } from "@/store/matrixSlice";
import { move } from "@/store/curSlice";
import { RootState } from "@/store";

import { blankMatrix, CreateBlock, toListData } from "@unit";

function injectCurDataToMatrix({
  curData,
  matrixData,
}: {
  curData: ReturnType<CreateBlock>;
  matrixData: number[][];
}) {
  const { shape, xy } = curData;
  const shapeList = toListData(shape);
  let matrix = toListData(matrixData);
  if (!xy) {
    return matrixData;
  }
  //主要的功能实现
  shapeList.forEach((shape, shapeY) => {
    const x = xy[1];
    const y = xy[0];
    shape.forEach((dot, shapeX) => {
      if (shapeY + y >= 0 && dot) {
        let line = matrix.get(shapeY + y);
        if (line) {
          let color;
          if (line.get(x + shapeX) === 1) {
            // 矩阵与方块重合
            color = 2;
          } else {
            color = 1;
          }
          line = line?.set(shapeX + x, color);
          matrix = matrix.set(y + shapeY, line);
        }
      }
    });
  });
  return matrix.toJS();
}

const Matrix = () => {
  const matrixData = useSelector((store: RootState) => store.matrix);
  const curData = useSelector((store: RootState) => store.cur);
  const { rotate, left, right, fall } = curData;
  const dispatch = useDispatch();
  function handleClear() {
    dispatch(changeTo(blankMatrix));
  }
  function handleRotate() {
    dispatch(move(rotate()));
  }
  function handleLeft() {
    dispatch(move(left()));
  }

  function handleRight() {
    dispatch(move(right()));
  }
  function handleFall() {
    dispatch(move(fall()));
  }

  const renderMatrixData = injectCurDataToMatrix({
    curData: curData,
    matrixData: matrixData,
  });

  return (
    <div className={styles.matrix}>
      {renderMatrixData.map((rowData, rowIndex) => {
        return (
          <p key={rowIndex}>
            {rowData.map((blockData: number, blockIndex: number) => {
              return (
                <Blocks.Block
                  key={blockIndex}
                  blink={blockData === 2}
                  active={blockData === 1}
                ></Blocks.Block>
              );
            })}
          </p>
        );
      })}
      <button onClick={handleRotate}> rotate</button>
      <button onClick={handleLeft}> left</button>
      <button onClick={handleRight}> right</button>
      <button onClick={handleFall}> fall</button>
    </div>
  );
};

export { Matrix };
