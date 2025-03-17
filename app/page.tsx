import { ChessGamesList } from "./components/chess-games-list";
import { ChessNotationCard } from "./components/chess-notation-card";
import { ChessboardComponent } from "./components/chessboard";
import { HeatmapLegend } from "./components/heatmap-legend";
import { PGNInput } from "./components/pgn-input";

export default function Home() {
  return (
    <div className="bg-zinc-900 flex items-center justify-center min-h-screen p-8 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="mb-2">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white">
            ♟️ Chess Heatmap
          </h1>
          <ChessNotationCard />
        </div>
        <ChessboardComponent />
        <HeatmapLegend />
        <ChessGamesList />
        <PGNInput />
      </div>
    </div>
  );
}
