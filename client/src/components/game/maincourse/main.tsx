"use client";

import type {
  MainCourseGameState,
  ItemType,
} from "@/app/(menu)/maincourse/page";
import BackIcon from "@/components/icon/back";
import StardustFlower from "@/components/meal/flower";
import InfinityFuzz from "@/components/meal/infinity_fuzz";
import { InfinityFuzzTag } from "@/components/vectors/tags/infinityfuzz_tag";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";

interface MainCoursePageProps extends MainCourseGameState {
  currentItem: ItemType;
  changeItem: (item: ItemType) => void;
}

const getNextItem = (currentItem: ItemType): ItemType => {
  if (currentItem === "pollen") {
    return "base";
  } else if (currentItem === "base") {
    return "pollen";
  }
  return "pollen";
};

export default function DrinksPage({
  changeItem,
  currentItem,
  flower: { base, pollen },
}: MainCoursePageProps) {
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
          <StardustFlower base={base.done} pollen={pollen.done} />
        </button>
      </div>

      {pollen.done && base.done && (
        <div className="z-60 absolute right-8 top-[14rem]">DOne!</div>
      )}
    </main>
  );
}
