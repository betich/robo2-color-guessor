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
          <Image src="/special.png" layout="fill" objectFit="cover" alt="" />
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
            <p className="text-center text-4xl font-bold text-black">
              The flounder&apos;s body
              <br /> in The Little Mermaid
            </p>
            <p className="text-center text-4xl font-bold text-black">* *</p>
          </div>
        </>
      )}

      {!splash && (
        <>
          <Image
            src="/special_play.png"
            layout="fill"
            objectFit="cover"
            alt=""
          />

          {gameState.infinityFuzz.topping.gummy && (
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

          {gameState.infinityFuzz.topping.fairy && (
            <div className="absolute right-[42rem] top-[25rem] flex w-36 flex-col items-center gap-y-4 p-4">
              <Image
                src="/breakfast/fairy.png"
                width={100}
                height={100}
                alt=""
              />

              <p className="text-center text-lg">
                icy fairy&apos;s little shard (sky)
              </p>
            </div>
          )}

          <p className="absolute right-4 top-4 text-center text-xl font-bold text-white">
            The flounder&apos;s body
            <br /> in The Little Mermaid
          </p>
        </>
      )}
    </>
  );
}
