import { Dispatch, SetStateAction } from "react";
import { DessertGameState } from "@/app/(menu)/dessert/page";
import { BaseQuestion } from "./scenes/base";
import { ToppingQuestion } from "./scenes/topping";
import { LayerQuestion } from "./scenes/layer";
import { IcingQuestion } from "./scenes/icing";

export interface GameStateProps {
  gameState: DessertGameState;
  setGameState: Dispatch<SetStateAction<DessertGameState>>;
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
  console.log("item ->>", item);
  switch (item) {
    case "base":
      return <BaseQuestion gameState={gameState} setGameState={setGameState} />;
    case "topping":
      return (
        <ToppingQuestion gameState={gameState} setGameState={setGameState} />
      );
    case "layer":
      return (
        <LayerQuestion gameState={gameState} setGameState={setGameState} />
      );
    case "icing":
      return (
        <IcingQuestion gameState={gameState} setGameState={setGameState} />
      );
    default:
      return <></>;
  }
}
