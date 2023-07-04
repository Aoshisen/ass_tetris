import styles from "./index.module.scss";

export const Game = ({ children }: any) => {
  return <div className={styles.game}>{children}</div>;
};
