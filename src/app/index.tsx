import styles from "./index.module.scss";
import { Layout } from "@components";
export const App = () => {
  return (
    <div className={styles.app}>
      <Layout.Game>
        <Layout.Screen>this is Screen</Layout.Screen>
        <Layout.Keys>this is Keys</Layout.Keys>
      </Layout.Game>
    </div>
  );
};
