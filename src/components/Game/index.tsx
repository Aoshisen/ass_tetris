import React from "react";
import Buttons from "./Buttons";
import Screen from "./Screen";

import styles from "./index.module.scss";
interface IGame {
  children?: any;
}

const GameInternal: React.FC<IGame> = ({ children }) => {
  return <div className={styles.game}>{children}</div>;
};

type ButtonComponent = typeof GameInternal & {
  Buttons: typeof Buttons;
  Screen: typeof Screen;
};

const Game = GameInternal as ButtonComponent;

Game.Buttons = Buttons;
Game.Screen = Screen;

export default Game;
