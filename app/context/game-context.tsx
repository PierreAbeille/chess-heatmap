"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { GameContextProps } from "../types/game-context-props";
import { Heatmap } from "../types/heatmap";
import { parsePGNtoFENList } from "../utils/pgn-parser";
import { Chess } from "chess.js";
import { useErrorContext } from "./error-context";
import { computeHeatmap } from "../utils/compute-heatmap";
import { PlayersInfo } from "../types/player-info";
import { parsePlayerNames } from "../utils/player-name-parser";

export const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
    //eslint-disable-next-line
  const [chess, setChess] = useState<any>(new Chess());
  const [pgn, setPgn] = useState<string>("");
  const [fens, setFens] = useState<string[]>([]);
  const [heatmap, setHeatmap] = useState<Heatmap>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedMove, setSelectedMove] = useState<number>(0);
  const { setError } = useErrorContext();
  const [playersInfo, setPlayersInfo] = useState<PlayersInfo>({ white: "", black: "" });
  const [minScale, setMinScale] = useState<number>(10);

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
      setPlayersInfo(parsePlayerNames(pgn));
      setSelectedMove(parsedFens.length - 1);
      setError(null);
      // eslint-disable-next-line
    } catch (error) {
      setError("Erreur lors de la lecture du PGN");
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
        selectedMove,
        setSelectedMove,
        parseAndSetPGN,
        playersInfo,
        minScale,
        setMinScale
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
