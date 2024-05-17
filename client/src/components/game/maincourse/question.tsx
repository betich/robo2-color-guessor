import { Dispatch, SetStateAction } from "react";
import { MainCourseGameState } from "@/app/(menu)/maincourse/page";
import { BaseQuestion } from "./scenes/base";
import { PollenQuestion } from "./scenes/pollen";

export interface GameStateProps {
  gameState: MainCourseGameState;
  setGameState: Dispatch<SetStateAction<MainCourseGameState>>;
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
    case "base":
      return <BaseQuestion gameState={gameState} setGameState={setGameState} />;
    case "pollen":
      return (
        <PollenQuestion gameState={gameState} setGameState={setGameState} />
      );
    default:
      return <></>;
  }
}
