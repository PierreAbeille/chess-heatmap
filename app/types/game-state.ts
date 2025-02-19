import { Heatmap } from "./heatmap";

export interface GameState {
    pgn: string;
    fens: string[];
    heatmap: Heatmap;
    loading: boolean;
    error: string | null;
    selectedMove: number;
}