import classnames from "classnames";
import styles from "./index.module.scss";

export const Block = ({ active = false, blink = false }) => {
  const blockClass = classnames(
    styles.block,
    active ? styles.active : "",
    blink ? styles.blink : ""
  );

  return <b className={blockClass}></b>;
};
