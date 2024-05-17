"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ColorType, GameStateProps } from "./question";
import { Scanner } from "@yudiel/react-qr-scanner";

export function HotDogQuestion({ gameState, setGameState }: GameStateProps) {
  const [splash, setSplash] = useState<boolean>(true);

  // listen to keyboard events
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "q") {
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
      }

      if (e.key === "w") {
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
      }

      if (e.key === "e") {
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
              The color of Italy Flag
            </p>
            <p className="text-center text-4xl font-bold text-black">* * *</p>
          </div>
        </>
      )}

      {!splash && (
        <>
          <Image src="/easy_play.png" layout="fill" objectFit="cover" alt="" />

          {gameState.breakfast.hotdog.leaf && (
            <div className="absolute bottom-[5rem] left-[15rem] flex w-36 flex-col items-center gap-y-4 p-4">
              <Image
                src="/breakfast/leaf.png"
                width={100}
                height={100}
                alt=""
              />

              <p className="text-center text-lg">four-leaf clover (green)</p>
            </div>
          )}

          {gameState.breakfast.hotdog.star && (
            <div className="absolute left-[23rem] top-[8rem] flex w-36 flex-col items-center gap-y-4 p-4">
              <Image
                src="/breakfast/star.png"
                width={100}
                height={100}
                alt=""
              />

              <p className="text-center text-lg">lost piece of star (white)</p>
            </div>
          )}

          {gameState.breakfast.hotdog.amanita && (
            <div className="absolute bottom-[12rem] right-[13rem] flex w-36 flex-col items-center gap-y-4 p-4">
              <Image
                src="/breakfast/amanita.png"
                width={100}
                height={100}
                alt=""
              />

              <p className="text-center text-lg">amanita (red)</p>
            </div>
          )}

          <p className="absolute right-4 top-4 text-center text-xl font-bold text-black">
            The color of Italy Flag
          </p>
        </>
      )}
    </>
  );
}
