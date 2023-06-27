import { useState } from "react";
import styles from "./App.module.scss";
export const App = () => {
  const [number, setNumber] = useState(1);
  function handleClick() {
    setNumber(number + 1);
  }
  return (
    <div id="app" onClick={handleClick} className={styles.app}>
      this {number}
    </div>
  );
};
