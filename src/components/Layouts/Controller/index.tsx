import styles from "./index.module.scss";

export const Controller = ({ children }: any) => {
  return <div className={styles.keys}>{children}</div>;
};
