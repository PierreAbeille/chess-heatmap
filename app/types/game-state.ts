import { Heatmap } from "./heatmap";

export interface GameState {
    // must determine the type of chess
    chess: any;
    pgn: string;
    fens: string[];
    heatmap: Heatmap;
    loading: boolean;
    error: string | null;
    selectedMove: number;
}