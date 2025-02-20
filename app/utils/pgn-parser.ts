import { Chess } from "chess.js";
import { useErrorContext } from "../context/error-context";

export const parsePGNtoFENList = (pgn: string): string[] => {
    const chess = new Chess();
    const fens: string[] = [];
    const {setError} = useErrorContext();

    try {
        chess.loadPgn(pgn);
    } catch (error) {
        setError("Erreur présente dans le PGN"); 
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