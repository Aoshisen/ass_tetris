import { Blocks } from "@components";
import styles from "./index.module.scss";
import { useSelector, useDispatch } from "react-redux";

import { changeTo } from "@/store/matrixSlice";
import { move } from "@/store/curSlice";
import { RootState } from "@/store";
import { CreateBlock } from "@/unit";

import { blankMatrix } from "@/unit/const";
import { List } from "immutable";
function toListData(array: number[][]) {
  let result = List<List<number>>([]);
  array.map((item, index: number) => {
    result = result.set(index, List(item));
  });
  return result;
}

function injectCurDataToMatrix({
  curData,
  matrixData,
}: {
  curData: ReturnType<CreateBlock>;
  matrixData: number[][];
}) {
  const { shape, xy } = curData;
  const cur = toListData(shape);
  const matrix = toListData(matrixData);
  console.log(cur, matrix);
  let result = matrixData.map((p: number[]) => {
    let rowData = List(p);
    let newData = rowData.set(0, 1);
    return newData.toJS();
  });

  return result as number[][];
}

const Matrix = () => {
  const matrixData = useSelector((store: RootState) => store.matrix);
  const curData = useSelector((store: RootState) => store.cur);
  const dispatch = useDispatch();
  function handleClear() {
    dispatch(changeTo(blankMatrix));
  }
  function handleAddCur() {
    dispatch(move(blankMatrix));
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
      <button onClick={handleAddCur}> clear</button>
    </div>
  );
};

export { Matrix };
