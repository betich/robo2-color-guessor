import Image from "next/image";
import { HotDogQuestion } from "./hotdog";
import { AppetizerGameState } from "@/app/(menu)/appetizer/page";
import { Dispatch, SetStateAction } from "react";
import { BunQuestion } from "./bun";
import { MeatQuestion } from "./meat";

export interface GameStateProps {
  gameState: AppetizerGameState;
  setGameState: Dispatch<SetStateAction<AppetizerGameState>>;
}

interface QuestionProps extends GameStateProps {
  item: string;
}

type ColorType =
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
    case "hotdog":
      return (
        <HotDogQuestion gameState={gameState} setGameState={setGameState} />
      );
    case "bun":
      return <BunQuestion gameState={gameState} setGameState={setGameState} />;
    case "meat":
      return <MeatQuestion gameState={gameState} setGameState={setGameState} />;
    default:
      return null;
  }
}
