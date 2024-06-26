"use client";
import Appetizer from "@/components/vectors/appetizer";
import Dessert from "@/components/vectors/dessert";
import Drinks from "@/components/vectors/drinks";
import MainCourse from "@/components/vectors/main_course";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [currentPlayer, setCurrentPlayer] = useState<"p1" | "p2">(
    (localStorage.getItem("currentPlayer") as "p1" | "p2") || "p1",
  );

  const handleSetCurrentPlayer = (player: "p1" | "p2") => {
    setCurrentPlayer(player);
    localStorage.setItem("currentPlayer", player);
  };

  const p1HighScore = localStorage.getItem("p1HighScore") || 0;
  const p2HighScore = localStorage.getItem("p2HighScore") || 0;

  return (
    <main
      style={{
        width: 1024,
        height: 600,
      }}
      className={clsx(
        "relative m-auto flex min-h-screen flex-col items-center justify-between p-24",
        "border border-black text-white",
      )}
    >
      <Image src="/bg.png" layout="fill" objectFit="cover" alt="" />

      <div className="absolute right-4 top-4 flex flex-col">
        <h1 className="text-lg font-bold text-white">
          p1 high score: {p1HighScore}
        </h1>
        <h1 className="text-lg font-bold text-white">
          p2 high score: {p2HighScore}
        </h1>
      </div>

      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        <button
          onClick={() => handleSetCurrentPlayer("p1")}
          className={clsx(
            "flex h-8 w-8 items-center justify-center rounded-full border p-2 text-lg font-bold",
            currentPlayer === "p1"
              ? "bg-white text-black"
              : "border-white text-white",
          )}
        >
          p1
        </button>
        <button
          onClick={() => handleSetCurrentPlayer("p2")}
          className={clsx(
            "flex h-8 w-8 items-center justify-center rounded-full border p-2 text-lg font-bold",
            currentPlayer === "p2"
              ? "bg-white text-black"
              : "border-white text-white",
          )}
        >
          p2
        </button>
      </div>

      <Link
        href="/appetizer"
        className="absolute bottom-4 left-[13rem] flex w-36 flex-col items-center gap-y-4 p-4"
      >
        <Appetizer />

        <div className="flex flex-col items-center">
          <h1 className="text-center text-2xl font-bold">appetizer</h1>
          <p className="text-center text-lg font-bold">( easy )</p>
        </div>
      </Link>

      <Link
        href="/maincourse"
        className="absolute bottom-4 left-[26rem] flex w-36 flex-col items-center gap-y-4 p-4"
      >
        <MainCourse />

        <div className="flex flex-col items-center">
          <h1 className="text-center text-2xl font-bold">main course</h1>
          <p className="text-center text-lg font-bold">( medium )</p>
        </div>
      </Link>

      <Link
        href="/dessert"
        className="absolute bottom-4 left-[38rem] flex w-36 flex-col items-center gap-y-4 p-4"
      >
        <Dessert />

        <div className="flex flex-col items-center">
          <h1 className="text-center text-2xl font-bold">dessert</h1>
          <p className="text-center text-lg font-bold">( hard )</p>
        </div>
      </Link>

      <Link
        href="/drinks"
        className="absolute bottom-2 right-[4rem] flex w-36 flex-col items-center gap-y-4 p-4"
      >
        <Drinks />

        <div className="flex flex-col items-center">
          <h1 className="text-center text-2xl font-bold">drinks</h1>
          <p className="text-center text-lg font-bold">***</p>
        </div>
      </Link>
    </main>
  );
}
