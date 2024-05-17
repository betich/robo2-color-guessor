"use client";

import type { DessertGameState, ItemType } from "@/app/(menu)/dessert/page";
import BackIcon from "@/components/icon/back";
import Cake from "@/components/meal/cake";
import CakeTag from "@/components/vectors/tags/cake_tag";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";

interface DessertPageProps extends DessertGameState {
  currentItem: ItemType;
  changeItem: (item: ItemType) => void;
}

const getNextItem = (currentItem: ItemType): ItemType => {
  if (currentItem === "topping") return "base";
  if (currentItem === "base") return "icing";
  if (currentItem === "icing") return "layer";
  if (currentItem === "layer") return "topping";
  return "topping";
};

export default function DessertPage({
  changeItem,
  currentItem,
  cake: { base, icing, layer, topping },
}: DessertPageProps) {
  const toNextItem = useCallback(() => {
    console.log("GONNA CHANGE TO", getNextItem(currentItem));
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
          <Cake
            base={base.done}
            icing={icing.done}
            layer={layer.done}
            topping={topping.done}
          />
        </button>
      </div>

      {icing.done && layer.done && topping.done && base.done && (
        <div className="z-60 absolute bottom-4 left-1/2 -translate-x-1/2">
          <CakeTag />
        </div>
      )}
    </main>
  );
}
