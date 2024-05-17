"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useTimer } from "@/utils/useTimer";
import QuestionPage, { ColorType } from "@/components/game/dessert/question";
import { timeToScore } from "@/utils/score";

import { io, type Socket } from "socket.io-client";
import clsx from "clsx";
import DessertPage from "@/components/game/dessert/main";

interface ServerToClientEvents {
  detect_color: (data: { data: string[] }) => void;
}

interface ClientToServerEvents {
  // hello: () => void;
}

export interface DessertGameState {
  cake: CakeProps;
}

export interface CakeProps {
  base: { jellyfish: boolean; gummy: boolean; done: boolean };
  topping: { leaf: boolean; done: boolean };
  layer: { star: boolean; amanita: boolean; done: boolean };
  icing: { berry: boolean; star: boolean; butterfly: boolean; done: boolean };
}

export type ItemType = keyof DessertGameState["cake"];

export default function Appetizer() {
  const [gameState, setGameState] = useState<DessertGameState>({
    cake: {
      base: { jellyfish: false, gummy: false, done: false },
      topping: { leaf: false, done: false },
      layer: { star: false, amanita: false, done: false },
      icing: { berry: false, star: false, butterfly: false, done: false },
    },
  });

  const [penalty, setPenalty] = useState<number>(0);
  const [penaltyDisplay, setPenaltyDisplay] = useState<boolean>(false);

  const [page, setPage] = useState<"main" | "question">("main");
  const [item, setItem] = useState<ItemType>("topping");

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
    const toppingState = gameState.cake.topping;

    if (toppingState.leaf && !toppingState.done) {
      setGameState((prev) => ({
        ...prev,
        cake: {
          ...prev.cake,
          topping: {
            ...prev.cake.topping,
            done: true,
          },
        },
      }));

      setTimeout(() => {
        backToMain();
      }, 1000);
    }

    const icingState = gameState.cake.icing;

    if (
      icingState.berry &&
      icingState.star &&
      icingState.butterfly &&
      !icingState.done
    ) {
      setGameState((prev) => ({
        ...prev,
        cake: {
          ...prev.cake,
          icing: {
            ...prev.cake.icing,
            done: true,
          },
        },
      }));

      setTimeout(() => {
        backToMain();
      }, 1000);
    }

    const layerState = gameState.cake.layer;

    if (layerState.star && layerState.amanita && !layerState.done) {
      setGameState((prev) => ({
        ...prev,
        cake: {
          ...prev.cake,
          layer: {
            ...prev.cake.layer,
            done: true,
          },
        },
      }));

      setTimeout(() => {
        backToMain();
      }, 1000);
    }

    const baseState = gameState.cake.base;

    if (baseState.jellyfish && baseState.gummy && !baseState.done) {
      setGameState((prev) => ({
        ...prev,
        cake: {
          ...prev.cake,
          base: {
            ...prev.cake.base,
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
      baseState.done &&
      layerState.done &&
      icingState.done &&
      toppingState.done &&
      page === "main"
    ) {
      // save score
      const player = localStorage.getItem("currentPlayer");
      const score = timeToScore(time, penalty, 12000);

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

      if (item === "base") {
        switch (color) {
          case "BLUE":
            setGameState((prev) => ({
              ...prev,
              cake: {
                ...prev.cake,
                base: {
                  ...prev.cake.base,
                  jellyfish: true,
                },
              },
            }));
            break;
          case "YELLOW":
            setGameState((prev) => ({
              ...prev,
              cake: {
                ...prev.cake,
                base: {
                  ...prev.cake.base,
                  gummy: true,
                },
              },
            }));
            break;
          default:
            console.log("PENALTY base", "item ->", item, "color ->", color);
            setPenalty((prev) => prev + 10);
            // setPenaltyDisplay(true);
            setTimeout(() => {
              setPenaltyDisplay(false);
            }, 1000);
            break;
        }
      }

      if (item === "icing") {
        switch (color) {
          case "WHITE":
            setGameState((prev) => ({
              ...prev,
              cake: {
                ...prev.cake,
                icing: {
                  ...prev.cake.icing,
                  star: true,
                },
              },
            }));
            break;
          case "BLACK":
            setGameState((prev) => ({
              ...prev,
              cake: {
                ...prev.cake,
                icing: {
                  ...prev.cake.icing,
                  butterfly: true,
                },
              },
            }));
            break;
          case "ORANGE":
            setGameState((prev) => ({
              ...prev,
              cake: {
                ...prev.cake,
                icing: {
                  ...prev.cake.icing,
                  berry: true,
                },
              },
            }));
            break;
          default:
            console.log("PENALTY icing", "item ->", item, "color ->", color);
            setPenalty((prev) => prev + 10);
            // setPenaltyDisplay(true);
            setTimeout(() => {
              setPenaltyDisplay(false);
            }, 1000);
            break;
        }
      }

      if (item === "layer") {
        switch (color) {
          case "RED":
            setGameState((prev) => ({
              ...prev,
              cake: {
                ...prev.cake,
                layer: {
                  ...prev.cake.layer,
                  amanita: true,
                },
              },
            }));
            break;
          case "WHITE":
            setGameState((prev) => ({
              ...prev,
              cake: {
                ...prev.cake,
                layer: {
                  ...prev.cake.layer,
                  star: true,
                },
              },
            }));
            break;
          default:
            console.log("PENALTY layer", "item ->", item, "color ->", color);
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
          case "GREEN":
            setGameState((prev) => ({
              ...prev,
              cake: {
                ...prev.cake,
                topping: {
                  ...prev.cake.topping,
                  leaf: true,
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
        <h1
          className={clsx(
            "text-lg font-bold",
            page === "main" ? "text-white" : "text-black",
          )}
        >
          time: {time}
        </h1>
      </div>

      {page === "main" && (
        <DessertPage
          cake={gameState.cake}
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
          <h1
            className={clsx(
              "text-2xl font-bold",
              page === "main" ? "text-white" : "text-black",
            )}
          >
            score: {score}
          </h1>
        </div>
      )}
    </main>
  );
}
