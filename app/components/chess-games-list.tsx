"use client"

import { useState } from "react";
import { useGameContext } from "../context/game-context"
import { GreatGame, greatGames } from "../data/great-games";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

export const ChessGamesList = () => {
    const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
    const {parseAndSetPGN} = useGameContext();
    const chessGames = greatGames;

    const handleGameSelect = (game: GreatGame) => {
        setSelectedGameId(game.id);
        parseAndSetPGN(game.pgn);
    }

    return (
      <div className="w-full max-w-3xl mx-auto">
        <ScrollArea className="rounded-2xl border border-zinc-800 p-4 py-6 bg-zinc-800/90">
        <h2 className="text-2xl font-bold text-center mb-4 text-white">
          Exemples de parties
        </h2>
          {chessGames.map((game) => (
            <Button
              key={game.id}
              onClick={() => handleGameSelect(game)}
            variant={selectedGameId === game.id ? "default" : "outline"}
            className="w-full h-16 justify-start mb-2 text-left"
            >
              <div>
                <div className="font-medium">{game.name}</div>
                <div className="text-sm text-muted-foreground">
                  {game.description}
                </div>
              </div>
            </Button>
          ))}
        </ScrollArea>
      </div>
    );
}