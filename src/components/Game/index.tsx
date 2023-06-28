import React from "react";
import Buttons from "./Buttons";
import Screen from "./Screen";
interface IGame {
  children?: any;
}

const GameInternal: React.FC<IGame> = ({ children }) => {
  return (
    <div>
      Game
      {children}
    </div>
  );
};

type ButtonComponent = typeof GameInternal & {
  Buttons: typeof Buttons;
  Screen: typeof Screen;
};

const Game = GameInternal as ButtonComponent;

Game.Buttons = Buttons;
Game.Screen = Screen;

export default Game;
