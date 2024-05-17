"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import MainCoursePage from "@/components/game/maincourse/main";
import { useTimer } from "@/utils/useTimer";
import QuestionPage, { ColorType } from "@/components/game/maincourse/question";
import { timeToScore } from "@/utils/score";

import { io, type Socket } from "socket.io-client";
import clsx from "clsx";

interface ServerToClientEvents {
  detect_color: (data: { data: string[] }) => void;
}

interface ClientToServerEvents {
  // hello: () => void;
}

export interface MainCourseGameState {
  flower: FlowerProps;
}

export interface FlowerProps {
  base: {
    done: boolean;
    minty: boolean;
    brown: boolean;
  };
  pollen: {
    done: boolean;
    red: boolean;
    green: boolean;
    blue: boolean;
  };
}

export type ItemType = keyof MainCourseGameState["flower"];

export default function Appetizer() {
  const [gameState, setGameState] = useState<MainCourseGameState>({
    flower: {
      base: {
        done: false,
        minty: false,
        brown: false,
      },
      pollen: {
        done: false,
        red: false,
        green: false,
        blue: false,
      },
    },
  });

  const [penalty, setPenalty] = useState<number>(0);
  const [penaltyDisplay, setPenaltyDisplay] = useState<boolean>(false);

  const [page, setPage] = useState<"main" | "question">("main");
  const [item, setItem] = useState<ItemType>("pollen");

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
    // hotdog
    // const hotdogState = gameState.breakfast.hotdog;
    // if (
    //   hotdogState.leaf &&
    //   hotdogState.star &&
    //   hotdogState.amanita &&
    //   !hotdogState.done
    // ) {
    //   setGameState((prev) => ({
    //     ...prev,
    //     breakfast: {
    //       ...prev.breakfast,
    //       hotdog: {
    //         ...prev.breakfast.hotdog,
    //         done: true,
    //       },
    //     },
    //   }));

    //   setTimeout(() => {
    //     backToMain();
    //   }, 1000);
    // }

    // pollen

    const pollenState = gameState.flower.pollen;

    if (
      pollenState.red &&
      pollenState.green &&
      pollenState.blue &&
      !pollenState.done
    ) {
      setGameState((prev) => ({
        ...prev,
        flower: {
          ...prev.flower,
          pollen: {
            ...prev.flower.pollen,
            done: true,
          },
        },
      }));

      setTimeout(() => {
        backToMain();
      }, 1000);
    }

    // base

    const baseState = gameState.flower.base;

    if (baseState.minty && baseState.brown && !baseState.done) {
      setGameState((prev) => ({
        ...prev,
        flower: {
          ...prev.flower,
          base: {
            ...prev.flower.base,
            done: true,
          },
        },
      }));

      setTimeout(() => {
        backToMain();
      }, 1000);
    }

    // all done
    if (pollenState.done && baseState.done && page === "main") {
      // save score
      const player = localStorage.getItem("currentPlayer");
      const score = timeToScore(time, penalty, 10000);

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

      // hotdog
      // if (item === "hotdog") {
      //   switch (color) {
      //     case "GREEN":
      //       setGameState((prev) => ({
      //         ...prev,
      //         breakfast: {
      //           ...prev.breakfast,
      //           hotdog: {
      //             ...prev.breakfast.hotdog,
      //             leaf: true,
      //           },
      //         },
      //       }));
      //       break;
      //     case "WHITE":
      //       setGameState((prev) => ({
      //         ...prev,
      //         breakfast: {
      //           ...prev.breakfast,
      //           hotdog: {
      //             ...prev.breakfast.hotdog,
      //             star: true,
      //           },
      //         },
      //       }));
      //       break;
      //     case "RED":
      //       setGameState((prev) => ({
      //         ...prev,
      //         breakfast: {
      //           ...prev.breakfast,
      //           hotdog: {
      //             ...prev.breakfast.hotdog,
      //             amanita: true,
      //           },
      //         },
      //       }));
      //       break;
      //     default:
      //       console.log("PENALTY hotdog", "item ->", item, "color ->", color);
      //       setPenalty((prev) => prev + 10);
      //       // setPenaltyDisplay(true);
      //       setTimeout(() => {
      //         setPenaltyDisplay(false);
      //       }, 1000);
      //       break;
      //   }
      // }

      // pollen
      if (item === "pollen") {
        switch (color) {
          case "RED":
            setGameState((prev) => ({
              ...prev,
              flower: {
                ...prev.flower,
                pollen: {
                  ...prev.flower.pollen,
                  red: true,
                },
              },
            }));
            break;
          case "GREEN":
            setGameState((prev) => ({
              ...prev,
              flower: {
                ...prev.flower,
                pollen: {
                  ...prev.flower.pollen,
                  green: true,
                },
              },
            }));
            break;
          case "BLUE":
            setGameState((prev) => ({
              ...prev,
              flower: {
                ...prev.flower,
                pollen: {
                  ...prev.flower.pollen,
                  blue: true,
                },
              },
            }));
            break;
          default:
            console.log("PENALTY pollen", "item ->", item, "color ->", color);
            setPenalty((prev) => prev + 10);
            // setPenaltyDisplay(true);
            setTimeout(() => {
              setPenaltyDisplay(false);
            }, 1000);
            break;
        }
      }

      // base

      if (item === "base") {
        switch (color) {
          case "MINT":
            setGameState((prev) => ({
              ...prev,
              flower: {
                ...prev.flower,
                base: {
                  ...prev.flower.base,
                  minty: true,
                },
              },
            }));
            break;
          case "BROWN":
            setGameState((prev) => ({
              ...prev,
              flower: {
                ...prev.flower,
                base: {
                  ...prev.flower.base,
                  brown: true,
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
        <MainCoursePage
          flower={gameState.flower}
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
