"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { GameStateProps } from "./question";

export function BunQuestion({ gameState, setGameState }: GameStateProps) {
  const [splash, setSplash] = useState<boolean>(true);

  // listen to keyboard events
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "q") {
        setGameState((prev) => ({
          ...prev,
          breakfast: {
            ...prev.breakfast,
            bun: {
              ...prev.breakfast.bun,
              gummy: true,
            },
          },
        }));
      }

      if (e.key === "w") {
        setGameState((prev) => ({
          ...prev,
          breakfast: {
            ...prev.breakfast,
            bun: {
              ...prev.breakfast.bun,
              jellyfish: true,
            },
          },
        }));
      }
    },
    [setGameState],
  );

  useEffect(() => {
    // three seconds, then go to the playing scene
    setTimeout(() => {
      setSplash(false);
    }, 3000);

    window.addEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      {splash && (
        <>
          <Image src="/easy.png" layout="fill" objectFit="cover" alt="" />
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
            <p className="text-center text-4xl font-bold text-black">
              Two colors that make green
            </p>
            <p className="text-center text-4xl font-bold text-black">* *</p>
          </div>
        </>
      )}

      {!splash && (
        <>
          <Image src="/easy_play.png" layout="fill" objectFit="cover" alt="" />

          {gameState.breakfast.bun.jellyfish && (
            <div className="absolute bottom-[5rem] left-[15rem] flex w-36 flex-col items-center gap-y-4 p-4">
              <Image
                src="/breakfast/jellyfish.png"
                width={100}
                height={100}
                alt=""
              />

              <p className="text-center text-lg">glowing jellyfish (blue)</p>
            </div>
          )}

          {gameState.breakfast.bun.gummy && (
            <div className="absolute left-[23rem] top-[8rem] flex w-36 flex-col items-center gap-y-4 p-4">
              <Image
                src="/breakfast/gummy.png"
                width={100}
                height={100}
                alt=""
              />

              <p className="text-center text-lg">energy gummy (yellow)</p>
            </div>
          )}
        </>
      )}
    </>
  );
}
