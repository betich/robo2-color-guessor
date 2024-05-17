"use client";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";

export default function QRPage() {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    console.log("data change ->", data);
  }, [data]);

  return (
    <main className="">
      {/* <div className="h-screen w-screen bg-white">
        <h1 className="text-4xl">blockedddf</h1>
      </div> */}
      <div className="absolute">
        <Scanner
          onResult={(text, result) => console.log(text, result)}
          onError={(error) => console.log(error?.message)}
        />
      </div>
    </main>
  );
}
