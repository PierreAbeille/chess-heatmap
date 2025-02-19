import { Chess } from "chess.js";

export const parsePGNtoFEN = (pgn: string): string[] => {
    const chess = new Chess();
    const fens: string[] = [];

    try {
        chess.loadPgn(pgn);
    } catch (error) {
        console.error("Invalid PGN", error);
        return [];
    }

    fens.push(chess.fen());
    while (chess.history().length) {
        chess.undo();
    }

    const moves = chess.history();
    moves.forEach((move) => {
        chess.move(move);
        fens.push(chess.fen());
    });

    return fens;
};