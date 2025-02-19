import { Chess } from "chess.js";

export const parsePGNtoFENList = (pgn: string): string[] => {
    const chess = new Chess();
    const fens: string[] = [];

    try {
        chess.loadPgn(pgn);
    } catch (error) {
        console.error("Invalid PGN", error);
        return [];
    }

    const moves = chess.history();
    const newChess = new Chess();

    fens.push(chess.fen());
    while (chess.history().length) {
        chess.undo();
    }

    moves.forEach((move) => {
        newChess.move(move);
        fens.push(newChess.fen());
    });

    return fens;
};