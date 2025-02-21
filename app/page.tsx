import { ChessNotationInfo } from "./components/chess-notation";
import { ChessboardComponent } from "./components/chessboard";
import { PGNInput } from "./components/pgn-input";

export default function Home() {
  return (
    <div className="bg-zinc-900 flex items-center justify-center min-h-screen p-8 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="mb-2">
        <h1 className="text-4xl font-bold mb-4 text-white">♟️ Chess Heatmap</h1>
        <ChessboardComponent />
        <PGNInput />
        <ChessNotationInfo />
      </div>
    </div>
  );
}
