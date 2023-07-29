import { Block } from "../Block";
import styles from "./index.module.scss";
import { RootState } from "@/store";
import { CreateBlock, toListData } from "@unit";
import { Fall, Left, Rotate, Right } from "@/controllers";
import { useSelector } from "react-redux";

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
                <Block
                  key={blockIndex}
                  blink={blockData === 2}
                  active={blockData === 1}
                ></Block>
              );
            })}
          </p>
        );
      })}
      <button onClick={Rotate}> rotate</button>
      <button onClick={Left}> left</button>
      <button onClick={Right}> right</button>
      <button onClick={Fall}> fall</button>
    </div>
  );
};

export { Matrix };
