"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { GameStateProps } from "../question";

export function IceQuestion({ gameState, setGameState }: GameStateProps) {
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
              The 3 buttons of
              <br /> Buzz Lightyear&apos;s Chest
            </p>
            <p className="text-center text-4xl font-bold text-black">* * *</p>
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

          {gameState.infinityFuzz.ice.leaf && (
            <div className="absolute bottom-[15rem] left-[22rem] flex w-36 flex-col items-center gap-y-4 p-4">
              <Image
                src="/breakfast/leaf.png"
                width={100}
                height={100}
                alt=""
              />

              <p className="text-center text-lg">four-leaf clover (green)</p>
            </div>
          )}

          {gameState.infinityFuzz.ice.jellyfish && (
            <div className="absolute right-[20rem] top-[13rem] flex w-36 flex-col items-center gap-y-4 p-4">
              <Image
                src="/breakfast/jellyfish.png"
                width={100}
                height={100}
                alt=""
              />

              <p className="text-center text-lg">jellyfish (blue)</p>
            </div>
          )}

          {gameState.infinityFuzz.ice.amanita && (
            <div className="absolute right-[22rem] top-[22rem] flex w-36 flex-col items-center gap-y-4 p-4">
              <Image
                src="/breakfast/amanita.png"
                width={100}
                height={100}
                alt=""
              />

              <p className="text-center text-lg">amanita (red)</p>
            </div>
          )}

          <p className="absolute right-4 top-4 text-center text-xl font-bold text-white">
            The 3 buttons of
            <br /> Buzz Lightyear&apos;s Chest
          </p>
        </>
      )}
    </>
  );
}
