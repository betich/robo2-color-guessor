"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { GameStateProps } from "../question";

export function ToppingQuestion({ gameState, setGameState }: GameStateProps) {
  const [splash, setSplash] = useState<boolean>(true);

  useEffect(() => {
    // three seconds, then go to the playing scene
    setTimeout(() => {
      setSplash(false);
    }, 3000);
  }, []);

  return (
    <>
      {splash && (
        <>
          <Image src="/hard.png" layout="fill" objectFit="cover" alt="" />
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
            <p className="text-center text-4xl font-bold text-black">
              The color of middle of the rainbow
            </p>
            <p className="text-center text-4xl font-bold text-black">*</p>
          </div>
        </>
      )}

      {!splash && (
        <>
          <Image src="/hard_play.png" layout="fill" objectFit="cover" alt="" />

          {gameState.cake.topping.leaf && (
            <div className="absolute left-[16rem] top-[15rem] flex w-36 flex-col items-center gap-y-4 p-4">
              <Image
                src="/breakfast/leaf.png"
                width={100}
                height={100}
                alt=""
              />

              <p className="text-center text-lg">four-leaf clover (green)</p>
            </div>
          )}

          <p className="absolute right-4 top-4 text-center text-xl font-bold text-white">
            The color of middle of the rainbow
          </p>
        </>
      )}
    </>
  );
}
