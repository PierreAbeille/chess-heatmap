import { Heatmap } from "../types/heatmap";

export const computeHeatmap = (fens: string[]): Heatmap => {
    const heatmap: Heatmap = {};

    let previousBoard: string[] | null = null;

    fens.forEach((fen) => {
        const board = fen.split(" ")[0]; // Pour chaque fen on extrait uniquement la partie sur la position des pièces  
        const rows = board.split("/"); // On sépare les lignes de l'échiquier

        if (previousBoard) {
            // On compare la position actuelle avec la position précédente afin de voir quelles pièces ont bougées
            rows.forEach((row, rowIndex) => {
                const rank = 8 - rowIndex; // On commence par la 8ème rangée
                let file = 0; // On commence par la colonne a

                for (const char of row) {
                    if (!isNaN(Number(char))) {
                        // Si c'est un nombre, ça représente des cases vides dans l'échiquier, donc on incrémente le compteur de colonne
                        file += Number(char);
                    } else {
                        // Sinon, c'est une pièce, on doit donc comparer avec la position précédente
                        const square = `${String.fromCharCode(97 + file)}${rank}`; // 97 est le code ASCII de 'a', on incrémente pour obtenir la lettre de la colonne

                        const prevRow = previousBoard ? previousBoard[rowIndex] : null; 
                        const prevChar = prevRow ? prevRow[file] : null;

                        // On regarde si la case précédente était vide ou non, en notation FEN les cases vides sont représentées par des nombres entre 1 et 8, représentant les cases vides succéssives
                        if (!prevChar || ['1', '2', '3', '4', '5', '6', '7', '8'].includes(prevChar)) {
                            // Si la case précédente est vide, on incrémente la heatmap
                            heatmap[square] = (heatmap[square] || 0) + 1;
                        }

                        file++;
                    }
                }
            });
        }

        previousBoard = rows;
    });
    
    return heatmap;
};