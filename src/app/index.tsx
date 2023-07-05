import styles from "./index.module.scss";
import { Layout, Matrix } from "@components";
export const App = () => {
  return (
    <div className={styles.app}>
      <Layout.Game>
        <Layout.Screen>
          <Matrix />
        </Layout.Screen>
        <Layout.Controller>this is Keys</Layout.Controller>
      </Layout.Game>
    </div>
  );
};
