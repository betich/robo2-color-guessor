"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import AppetizerPage from "@/components/game/appetizer/main";
import { useTimer } from "@/utils/useTimer";
import QuestionPage, { ColorType } from "@/components/game/scenes/question";
import { timeToScore } from "@/utils/score";

export interface AppetizerGameState {
  breakfast: BreakfastProps;
}

export interface BreakfastProps {
  hotdog: { leaf: boolean; star: boolean; amanita: boolean; done: boolean };
  bun: { jellyfish: boolean; gummy: boolean; done: boolean };
  meat: { berry: boolean; done: boolean };
}

export type ItemType = keyof AppetizerGameState["breakfast"];

export default function Appetizer() {
  const [gameState, setGameState] = useState<AppetizerGameState>({
    breakfast: {
      hotdog: { leaf: false, star: false, amanita: false, done: false },
      bun: { jellyfish: false, gummy: false, done: false },
      meat: { berry: false, done: false },
    },
  });

  const [page, setPage] = useState<"main" | "question">("main");
  const [item, setItem] = useState<ItemType>("meat");

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

    // bun
    const bunState = gameState.breakfast.bun;
    if (bunState.jellyfish && bunState.gummy && !bunState.done) {
      setGameState((prev) => ({
        ...prev,
        breakfast: {
          ...prev.breakfast,
          bun: {
            ...prev.breakfast.bun,
            done: true,
          },
        },
      }));

      setTimeout(() => {
        backToMain();
      }, 1000);
    }

    // meat
    const meatState = gameState.breakfast.meat;

    if (meatState.berry && !meatState.done) {
      setGameState((prev) => ({
        ...prev,
        breakfast: {
          ...prev.breakfast,
          meat: {
            ...prev.breakfast.meat,
            done: true,
          },
        },
      }));

      setTimeout(() => {
        backToMain();
      }, 1000);
    }

    // all done
    if (
      hotdogState.done &&
      bunState.done &&
      meatState.done &&
      page === "main"
    ) {
      // save score
      const player = localStorage.getItem("currentPlayer");
      const score = timeToScore(time);

      if (player === "p1") {
        localStorage.setItem("p1HighScore", String(score));
      }

      if (player === "p2") {
        localStorage.setItem("p2HighScore", String(score));
      }
    }
  }, [gameState, backToMain, page, time]);

  const handleColorDetect = (color: ColorType) => {
    // hotdog
    switch (color) {
      case "GREEN":
        setGameState((prev) => ({
          ...prev,
          breakfast: {
            ...prev.breakfast,
            hotdog: {
              ...prev.breakfast.hotdog,
              leaf: true,
            },
          },
        }));
        break;
      case "WHITE":
        setGameState((prev) => ({
          ...prev,
          breakfast: {
            ...prev.breakfast,
            hotdog: {
              ...prev.breakfast.hotdog,
              star: true,
            },
          },
        }));
        break;
      case "RED":
        setGameState((prev) => ({
          ...prev,
          breakfast: {
            ...prev.breakfast,
            hotdog: {
              ...prev.breakfast.hotdog,
              amanita: true,
            },
          },
        }));
        break;
      default:
        break;
    }
  };

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
