import { GameState } from "./game-state";
import { Heatmap } from "./heatmap";

export interface GameContextProps extends GameState {
    setPgn: (pgn: string) => void;
    setFens: (fens: string[]) => void;
    setHeatmap: (heatmap: Heatmap) => void;
    setLoading: (loading: boolean) => void;
    setSelectedMove: (selectedMove: number) => void;
    parseAndSetPGN: (pgn: string) => void;
    setMinScale: (minScale: number) => void;
}