"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { GameContextProps } from "../types/game-context-props";
import { Heatmap } from "../types/heatmap";
import { parsePGNtoFENList } from "../utils/pgn-parser";
import { Chess } from "chess.js";
import { computeHeatmap } from "../utils/compute-heatmap";

export const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  //eslint-disable-next-line
  const [chess, setChess] = useState<any>(new Chess());
  const [pgn, setPgn] = useState<string>("");
  const [fens, setFens] = useState<string[]>([]);
  const [heatmap, setHeatmap] = useState<Heatmap>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMove, setSelectedMove] = useState<number>(0);

  // ✅ Récupération des données au chargement
  useEffect(() => {
    const savedPgn = sessionStorage.getItem("pgn");
    const savedFens = sessionStorage.getItem("fens");

    if (savedPgn) setPgn(savedPgn);
    if (savedFens) setFens(JSON.parse(savedFens));
  }, []);

  // ✅ Sauvegarde automatique à chaque mise à jour
  useEffect(() => {
    sessionStorage.setItem("pgn", pgn);
    sessionStorage.setItem("fens", JSON.stringify(fens));
  }, [pgn, fens]);

  // ✅ Calcul de la heatmap à chaque changement de fens ou de selectedMove + chargement de la dernière position
  useEffect(() => {
    if (fens.length > 0) {
      const computedHeatmap = computeHeatmap(fens);
      chess.load(fens[selectedMove]); // Charger la position actuelle
      setHeatmap(computedHeatmap);
    }
  }, [selectedMove, fens]);

  const parseAndSetPGN = (pgn: string) => {
    setLoading(true);

    try {
      const parsedFens = parsePGNtoFENList(pgn);
      setFens(parsedFens);
      setPgn(pgn);
      setSelectedMove(parsedFens.length - 1);
      setError(null);
      // eslint-disable-next-line
    } catch (error) {
      setError("Erreur lors du parsing PGN vers FEN");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GameContext.Provider
      value={{
        chess,
        pgn,
        setPgn,
        fens,
        setFens,
        heatmap,
        setHeatmap,
        loading,
        setLoading,
        error,
        setError,
        selectedMove,
        setSelectedMove,
        parseAndSetPGN,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export const useGameContext = (): GameContextProps => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error("useGameContext must be used within a GameProvider");
    }
    return context;
};
