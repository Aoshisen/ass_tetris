import styles from "./index.module.scss";
import { Layout, Matrix } from "@components";
import { Provider } from "react-redux";
import store from "@/store";

export const App = () => {
  return (
    <div className={styles.app}>
      <Provider store={store}>
        <Layout.Game>
          <Layout.Screen>
            <Matrix />
          </Layout.Screen>
          <Layout.Controller>this is Keys</Layout.Controller>
        </Layout.Game>
      </Provider>
    </div>
  );
};
