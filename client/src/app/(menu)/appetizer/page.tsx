"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import AppetizerPage from "@/components/game/appetizer/main";
import { useTimer } from "@/utils/useTimer";
import QuestionPage from "@/components/game/scenes/question";

export interface AppetizerGameState {
  breakfast: BreakfastProps;
}

export interface BreakfastProps {
  hotdog: { leaf: boolean; star: boolean; amanita: boolean; done: boolean };
  bun: { done: boolean };
  meat: { done: boolean };
}

export type ItemType = keyof AppetizerGameState["breakfast"];

export default function Appetizer() {
  const [gameState, setGameState] = useState<AppetizerGameState>({
    breakfast: {
      bun: { done: false },
      hotdog: { leaf: false, star: false, amanita: false, done: false },
      meat: { done: false },
    },
  });

  const [page, setPage] = useState<"main" | "question">("main");
  const [item, setItem] = useState<ItemType>("bun");

  const time = useTimer();

  const changeItem = useCallback((item: ItemType) => {
    setItem(item);
    setPage("question");
  }, []);

  const backToMain = useCallback(() => {
    setPage("main");
  }, []);

  useEffect(() => {
    // hotdog
    const hotdogState = gameState.breakfast.hotdog;
    if (
      hotdogState.leaf &&
      hotdogState.star &&
      hotdogState.amanita &&
      !hotdogState.done
    ) {
      setGameState((prev) => ({
        ...prev,
        breakfast: {
          ...prev.breakfast,
          hotdog: {
            ...prev.breakfast.hotdog,
            done: true,
          },
        },
      }));

      setTimeout(() => {
        backToMain();
      }, 1000);
    }
  }, [gameState, backToMain]);

  return (
    <main
      style={{
        width: 1024,
        height: 600,
      }}
      className="relative"
    >
      <div className="absolute bottom-4 right-4 z-50 flex flex-col">
        <h1 className="text-lg font-bold text-white">time: {time}</h1>
      </div>

      {page === "main" && (
        <AppetizerPage
          breakfast={gameState.breakfast}
          changeItem={changeItem}
          currentItem={item}
        />
      )}
      {page === "question" && (
        <QuestionPage
          item={item}
          gameState={gameState}
          setGameState={setGameState}
        />
      )}
    </main>
  );
}