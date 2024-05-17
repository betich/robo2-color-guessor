"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import DrinksPage from "@/components/game/drinks/main";
import { useTimer } from "@/utils/useTimer";
import QuestionPage, { ColorType } from "@/components/game/drinks/question";
import { timeToScore } from "@/utils/score";

import { io, type Socket } from "socket.io-client";
import clsx from "clsx";

interface ServerToClientEvents {
  detect_color: (data: { data: string[] }) => void;
}

interface ClientToServerEvents {
  // hello: () => void;
}

export interface DrinksGameState {
  infinityFuzz: InfinityFuzzProps;
}

export interface InfinityFuzzProps {
  ice: { leaf: boolean; jellyfish: boolean; amanita: boolean; done: boolean };
  topping: { fairy: boolean; gummy: boolean; done: boolean };
  drink: { stone: boolean; minty: boolean; done: boolean };
}

export type ItemType = keyof DrinksGameState["infinityFuzz"];

export default function Appetizer() {
  const [gameState, setGameState] = useState<DrinksGameState>({
    infinityFuzz: {
      ice: { leaf: false, jellyfish: false, amanita: false, done: false },
      topping: { fairy: false, gummy: false, done: false },
      drink: { stone: false, minty: false, done: false },
    },
  });

  const [penalty, setPenalty] = useState<number>(0);
  const [penaltyDisplay, setPenaltyDisplay] = useState<boolean>(false);

  const [page, setPage] = useState<"main" | "question">("main");
  const [item, setItem] = useState<ItemType>("drink");

  const { time, stopTimer } = useTimer();
  const [gameEnd, setGameEnd] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const changeItem = useCallback((item: ItemType) => {
    setItem(item);
    setPage("question");
  }, []);

  const backToMain = useCallback(() => {
    setPage("main");
  }, []);

  useEffect(() => {
    const iceState = gameState.infinityFuzz.ice;
    if (
      iceState.leaf &&
      iceState.jellyfish &&
      iceState.amanita &&
      !iceState.done
    ) {
      setGameState((prev) => ({
        ...prev,
        infinityFuzz: {
          ...prev.infinityFuzz,
          ice: {
            ...prev.infinityFuzz.ice,
            done: true,
          },
        },
      }));

      setTimeout(() => {
        backToMain();
      }, 1000);
    }

    const toppingState = gameState.infinityFuzz.topping;
    if (toppingState.fairy && toppingState.gummy && !toppingState.done) {
      setGameState((prev) => ({
        ...prev,
        infinityFuzz: {
          ...prev.infinityFuzz,
          topping: {
            ...prev.infinityFuzz.topping,
            done: true,
          },
        },
      }));

      setTimeout(() => {
        backToMain();
      }, 1000);
    }

    const drinkState = gameState.infinityFuzz.drink;
    if (drinkState.stone && drinkState.minty && !drinkState.done) {
      setGameState((prev) => ({
        ...prev,
        infinityFuzz: {
          ...prev.infinityFuzz,
          drink: {
            ...prev.infinityFuzz.drink,
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
      iceState.done &&
      toppingState.done &&
      drinkState.done &&
      page === "main"
    ) {
      // save score
      const player = localStorage.getItem("currentPlayer");
      const score = timeToScore(time, penalty, 24000);

      stopTimer();
      setGameEnd(true);
      setScore(score);

      if (player === "p1") {
        localStorage.setItem("p1HighScore", String(score));
      }

      if (player === "p2") {
        localStorage.setItem("p2HighScore", String(score));
      }
    }
  }, [gameState, backToMain, page, time, penalty, stopTimer]);

  const handleColorDetect = useCallback(
    (color: ColorType) => {
      if (gameEnd) return;
      if (page === "main") return;
      if (!color) return;

      console.log("color detected", color);
      console.log("item", item);

      // ice
      if (item === "ice") {
        switch (color) {
          case "GREEN":
            setGameState((prev) => ({
              ...prev,
              infinityFuzz: {
                ...prev.infinityFuzz,
                ice: {
                  ...prev.infinityFuzz.ice,
                  leaf: true,
                },
              },
            }));
            break;
          case "BLUE":
            setGameState((prev) => ({
              ...prev,
              infinityFuzz: {
                ...prev.infinityFuzz,
                ice: {
                  ...prev.infinityFuzz.ice,
                  jellyfish: true,
                },
              },
            }));
            break;
          case "RED":
            setGameState((prev) => ({
              ...prev,
              infinityFuzz: {
                ...prev.infinityFuzz,
                ice: {
                  ...prev.infinityFuzz.ice,
                  amanita: true,
                },
              },
            }));
            break;
          default:
            console.log("PENALTY ice", "item ->", item, "color ->", color);
            setPenalty((prev) => prev + 10);
            // setPenaltyDisplay(true);
            setTimeout(() => {
              setPenaltyDisplay(false);
            }, 1000);
            break;
        }
      }

      if (item === "topping") {
        switch (color) {
          case "AQUA":
            setGameState((prev) => ({
              ...prev,
              infinityFuzz: {
                ...prev.infinityFuzz,
                topping: {
                  ...prev.infinityFuzz.topping,
                  fairy: true,
                },
              },
            }));
            break;
          case "YELLOW":
            setGameState((prev) => ({
              ...prev,
              infinityFuzz: {
                ...prev.infinityFuzz,
                topping: {
                  ...prev.infinityFuzz.topping,
                  gummy: true,
                },
              },
            }));
            break;
          default:
            console.log("PENALTY topping", "item ->", item, "color ->", color);
            setPenalty((prev) => prev + 10);
            // setPenaltyDisplay(true);
            setTimeout(() => {
              setPenaltyDisplay(false);
            }, 1000);
            break;
        }
      }

      if (item === "drink") {
        switch (color) {
          case "PURPLE":
            setGameState((prev) => ({
              ...prev,
              infinityFuzz: {
                ...prev.infinityFuzz,
                drink: {
                  ...prev.infinityFuzz.drink,
                  stone: true,
                },
              },
            }));
            break;
          case "MINT":
            setGameState((prev) => ({
              ...prev,
              infinityFuzz: {
                ...prev.infinityFuzz,
                drink: {
                  ...prev.infinityFuzz.drink,
                  minty: true,
                },
              },
            }));
            break;
          default:
            console.log("PENALTY drink", "item ->", item, "color ->", color);
            setPenalty((prev) => prev + 10);
            // setPenaltyDisplay(true);
            setTimeout(() => {
              setPenaltyDisplay(false);
            }, 1000);
            break;
        }
      }
    },
    [item, gameEnd, page],
  );

  useEffect(() => {
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      "http://localhost:8080",
    );

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
    });

    socket.on("detect_color", (data) => {
      handleColorDetect(data.data[0] as ColorType);
    });
  }, [handleColorDetect]);

  return (
    <main
      style={{
        width: 1024,
        height: 600,
      }}
      className="relative"
    >
      <div className="absolute bottom-4 right-4 z-50 flex flex-col">
        <h1 className={clsx("text-lg font-bold", "text-white")}>
          time: {time}
        </h1>
      </div>

      {page === "main" && (
        <DrinksPage
          infinityFuzz={gameState.infinityFuzz}
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

      {/* EVENTS */}
      {penaltyDisplay && (
        <div className="absolute left-4 top-4 z-50 flex flex-col">
          <h1 className="text-lg font-bold text-black">penalty: -10</h1>
        </div>
      )}

      {gameEnd && (
        <div className="absolute left-1/2 top-4 z-50 flex -translate-x-1/2 flex-col">
          <h1 className={clsx("text-2xl font-bold", "text-white")}>
            score: {score}
          </h1>
        </div>
      )}
    </main>
  );
}
