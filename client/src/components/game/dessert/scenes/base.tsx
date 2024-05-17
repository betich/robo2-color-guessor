"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { GameStateProps } from "../question";

export function BaseQuestion({ gameState, setGameState }: GameStateProps) {
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
              The Color of European Union Flag
            </p>
            <p className="text-center text-4xl font-bold text-black">* *</p>
          </div>
        </>
      )}

      {!splash && (
        <>
          <Image src="/hard_play.png" layout="fill" objectFit="cover" alt="" />

          {gameState.cake.base.jellyfish && (
            <div className="absolute bottom-[15rem] left-[22rem] flex w-36 flex-col items-center gap-y-4 p-4">
              <Image
                src="/breakfast/jellyfish.png"
                width={100}
                height={100}
                alt=""
              />

              <p className="text-center text-lg">jellyfish (blue)</p>
            </div>
          )}

          {gameState.cake.base.gummy && (
            <div className="absolute right-[22rem] top-[15rem] flex w-36 flex-col items-center gap-y-4 p-4">
              <Image
                src="/breakfast/gummy.png"
                width={100}
                height={100}
                alt=""
              />

              <p className="text-center text-lg">energy gummy (yellow)</p>
            </div>
          )}

          <p className="absolute right-4 top-4 text-center text-xl font-bold text-white">
            The Color of European Union Flag
          </p>
        </>
      )}
    </>
  );
}
