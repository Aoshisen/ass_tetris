import Buttons from "./Buttons";
import Screen from "./Screen";
import { forwardRef } from "react";

type CompoundedComponent = React.ForwardRefExoticComponent<
  React.RefAttributes<HTMLElement>
> & {
  Buttons: typeof Buttons;
  Screen: typeof Screen;
};

interface IGame {
  children?: any;
}

const InternalGame: React.ForwardRefRenderFunction<
  HTMLButtonElement | HTMLAnchorElement,
  IGame
> = (props, ref) => {
  const { children } = props;
  return <div ref={ref}>{children}</div>;
};

const Game = forwardRef(InternalGame) as CompoundedComponent;

Game.Buttons = Buttons;
Game.Screen = Screen;

export default Game;
