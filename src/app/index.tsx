import styles from "./index.module.scss";
import { Game } from "@components";

export const App = () => {
  return (
    <div className={styles.app}>
      <Game>
        <Game.Screen></Game.Screen>
        <Game.Buttons></Game.Buttons>
      </Game>
    </div>
  );
};
