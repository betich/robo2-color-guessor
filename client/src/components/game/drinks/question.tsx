import { Dispatch, SetStateAction } from "react";
import { IceQuestion } from "./scenes/ice";
import { DrinksGameState } from "@/app/(menu)/drinks/page";
import { ToppingQuestion } from "./scenes/topping";
import { DrinkQuestion } from "./scenes/drink";

export interface GameStateProps {
  gameState: DrinksGameState;
  setGameState: Dispatch<SetStateAction<DrinksGameState>>;
}

interface QuestionProps extends GameStateProps {
  item: string;
}

export type ColorType =
  | "RED"
  | "YELLOW"
  | "BLUE"
  | "PINK"
  | "PURPLE"
  | "AQUA"
  | "GREEN"
  | "MINT"
  | "ORANGE"
  | "BROWN"
  | "BLACK"
  | "WHITE";

export const Colors: Record<ColorType, string> = {
  RED: "#D5333D",
  YELLOW: "#F6DC06",
  BLUE: "#005491",
  PINK: "#E782B5",
  PURPLE: "#947BB8",
  AQUA: "#98D4E7",
  GREEN: "#5DACA6",
  MINT: "#6CC7B7",
  ORANGE: "#F68A1F",
  BROWN: "#966256",
  BLACK: "#231F20",
  WHITE: "#FFFFFF",
};

export default function QuestionPage({
  item,
  gameState,
  setGameState,
}: QuestionProps) {
  switch (item) {
    case "ice":
      return <IceQuestion gameState={gameState} setGameState={setGameState} />;
    case "topping":
      return (
        <ToppingQuestion gameState={gameState} setGameState={setGameState} />
      );
    case "drink":
      return (
        <DrinkQuestion gameState={gameState} setGameState={setGameState} />
      );
    default:
      return <></>;
  }
}
