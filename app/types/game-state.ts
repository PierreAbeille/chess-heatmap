import { Heatmap } from "./heatmap";

export interface GameState {
    // must determine the type of chess
    // eslint-disable-next-line
    chess: any;
    pgn: string;
    fens: string[];
    heatmap: Heatmap;
    loading: boolean;
    error: string | null;
    selectedMove: number;
}