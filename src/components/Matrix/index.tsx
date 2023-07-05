import { Blocks } from "@components";
import styles from "./index.module.scss";
import { blankMatrix } from "@unit";

export const Matrix = () => {
  return (
    <div className={styles.matrix}>
      {blankMatrix.map((rowData, rowIndex) => {
        return (
          <p key={rowIndex}>
            {rowData.map((_: number, blockIndex: number) => {
              return <Blocks.Block key={blockIndex}></Blocks.Block>;
            })}
          </p>
        );
      })}
    </div>
  );
};
