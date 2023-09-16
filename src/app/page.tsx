"use client";

import dynamic from "next/dynamic";

const Terminal = dynamic(
  () => import("@/app/_components/Terminal").then((mod) => mod.default),
  {
    ssr: false,
  }
);

export default function Home() {
  return <Terminal id="terminal" />;
}
