import Image from "next/image";
import { ChessboardComponent } from "./components/chessboard";

export default function Home() {
  return (
    <div className="bg-zinc-900 flex items-center justify-center min-h-screen p-8 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <div className="mb-2">
            <h1>Chess Heatmap</h1> <br />
            running on{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              staging.chess-heatmap.hellopedro.dev
            </code>
            <ChessboardComponent />
          </div>
    </div>
  );
}
