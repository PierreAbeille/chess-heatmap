import { createContext, useContext, useState } from "react";
import { GameContextProps } from "../types/game-context-props";
import { Heatmap } from "../types/heatmap";

export const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
    const [pgn, setPgn] = useState<string>("");
    const [fens, setFens] = useState<string[]>([]);
    const [heatmap, setHeatmap] = useState<Heatmap>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedMove, setSelectedMove] = useState<number>(0);

    return (
        <GameContext.Provider value={{
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
        }}>
            {children}
        </GameContext.Provider>
    )
}

export const useGameContext = (): GameContextProps => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error("useGameContext must be used within a GameProvider");
    }
    return context;
};
