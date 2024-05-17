"use client";

import type { DrinksGameState, ItemType } from "@/app/(menu)/drinks/page";
import BackIcon from "@/components/icon/back";
import InfinityFuzz from "@/components/meal/infinity_fuzz";
import { InfinityFuzzTag } from "@/components/vectors/tags/infinityfuzz_tag";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";

interface DrinksPageProps extends DrinksGameState {
  currentItem: ItemType;
  changeItem: (item: ItemType) => void;
}

const getNextItem = (currentItem: ItemType): ItemType => {
  if (currentItem === "drink") {
    return "ice";
  } else if (currentItem === "ice") {
    return "topping";
  } else if (currentItem === "topping") {
    return "drink";
  }
  return "drink";
};

export default function DrinksPage({
  changeItem,
  currentItem,
  infinityFuzz: { drink, ice, topping },
}: DrinksPageProps) {
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
      <Image src="/drink_bg.png" layout="fill" objectFit="cover" alt="" />
      <Link href="/" className="absolute left-4 top-4">
        <BackIcon />
      </Link>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <button onClick={toNextItem}>
          <InfinityFuzz
            drink={drink.done}
            ice={ice.done}
            topping={topping.done}
          />
        </button>
      </div>

      {drink.done && ice.done && topping.done && (
        <div className="z-60 absolute right-8 top-[14rem]">
          <InfinityFuzzTag />
        </div>
      )}
    </main>
  );
}
