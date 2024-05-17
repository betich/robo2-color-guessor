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
          <Image src="/medium.png" layout="fill" objectFit="cover" alt="" />
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
            <p className="text-center text-4xl font-bold text-black">
              Mint chocolate ice cream
            </p>
            <p className="text-center text-4xl font-bold text-black">* *</p>
          </div>
        </>
      )}

      {!splash && (
        <>
          <Image
            src="/medium_play.png"
            layout="fill"
            objectFit="cover"
            alt=""
          />

          {gameState.flower.base.brown && (
            <div className="absolute right-[22rem] top-[15rem] flex w-36 flex-col items-center gap-y-4 p-4">
              <Image
                src="/breakfast/brown.png"
                width={100}
                height={100}
                alt=""
              />

              <p className="text-center text-lg">earthy gem (brown)</p>
            </div>
          )}

          {gameState.flower.base.minty && (
            <div className="absolute right-[42rem] top-[25rem] flex w-36 flex-col items-center gap-y-4 p-4">
              <Image
                src="/breakfast/minty.png"
                width={100}
                height={100}
                alt=""
              />

              <p className="text-center text-lg">a minty shard (mint)</p>
            </div>
          )}

          <p className="absolute right-4 top-4 text-center text-xl font-bold text-white">
            Mint chocolate ice cream
          </p>
        </>
      )}
    </>
  );
}
