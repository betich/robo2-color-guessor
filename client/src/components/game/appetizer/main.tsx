"use client";

import type { AppetizerGameState, ItemType } from "@/app/(menu)/appetizer/page";
import BackIcon from "@/components/icon/back";
import Breakfast from "@/components/meal/breakfast";
import Image from "next/image";
import Link from "next/link";

interface AppetizerPageProps extends AppetizerGameState {
  currentItem: ItemType;
  changeItem: (item: ItemType) => void;
}

export default function AppetizerPage({
  changeItem,
  currentItem,
  breakfast: { bun, hotdog, meat },
}: AppetizerPageProps) {
  const toNextItem = () => {
    if (currentItem === "bun") {
      changeItem("hotdog");
    } else if (currentItem === "hotdog") {
      changeItem("meat");
    } else {
      changeItem("bun");
    }
  };

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
    </main>
  );
}
