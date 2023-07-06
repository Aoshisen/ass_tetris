import { Blocks } from "@components";
import styles from "./index.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { changeTo } from "@/store/matrixSlice";
import { RootState } from "@/store";
import { blankMatrix } from "@/unit/const";

const Matrix = () => {
  const matrixData = useSelector((store: RootState) => store.matrix);
  const dispatch = useDispatch();
  function handleClear() {
    dispatch(changeTo(blankMatrix));
  }

  return (
    <div className={styles.matrix}>
      {matrixData.map((rowData, rowIndex) => {
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
      <button onClick={handleClear}> clear</button>
    </div>
  );
};

export { Matrix };
