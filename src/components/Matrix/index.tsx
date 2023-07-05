import { Blocks } from "..";
import styles from "./index.module.scss";

const row = Array(10).fill(0);
const matrix = Array(20).fill(row);

export const Matrix = () => {
  return (
    <div className={styles.matrix}>
      {matrix.map((rowData, rowIndex) => {
        return (
          <p key={rowIndex}>
            {rowData.map((blockData: number, blockIndex: number) => {
              return <Blocks.Block key={blockIndex}></Blocks.Block>;
            })}
          </p>
        );
      })}
    </div>
  );
};
