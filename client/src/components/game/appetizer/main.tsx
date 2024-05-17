"use client";

import {
  type AppetizerGameState,
  type ItemType,
} from "@/app/(menu)/appetizer/page";
import BackIcon from "@/components/icon/back";
import Breakfast from "@/components/meal/breakfast";
import BreakfastTag from "@/components/vectors/tags/breakfast_tag";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";

interface AppetizerPageProps extends AppetizerGameState {
  currentItem: ItemType;
  changeItem: (item: ItemType) => void;
}

const getNextItem = (currentItem: ItemType): ItemType => {
  if (currentItem === "meat") {
    return "hotdog";
  } else if (currentItem === "hotdog") {
    return "bun";
  } else if (currentItem === "bun") {
    return "meat";
  }
  return "meat";
};

export default function AppetizerPage({
  changeItem,
  currentItem,
  breakfast: { bun, hotdog, meat },
}: AppetizerPageProps) {
  const toNextItem = useCallback(() => {
    changeItem(getNextItem(currentItem));
  }, [changeItem, currentItem]);

  return (
    <main
      style={{
        width: 1024,
        height: 600,
      }}
      className="relative"
    >
      <Image src="/appetizer_bg.png" layout="fill" objectFit="cover" alt="" />
      <Link href="/" className="absolute left-4 top-4">
        <BackIcon />
      </Link>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <button onClick={toNextItem}>
          <Breakfast bun={bun.done} hotdog={hotdog.done} meat={meat.done} />
        </button>
      </div>

      {bun.done && hotdog.done && meat.done && (
        <div className="z-60 absolute bottom-4 left-1/2 -translate-x-1/2">
          <BreakfastTag className="w-[24rem]" />
        </div>
      )}
    </main>
  );
}
