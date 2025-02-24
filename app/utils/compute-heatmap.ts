import { Heatmap } from "../types/heatmap";

const fenToMatrix = (fenPosition: string): (string | null)[][] => {

    const rows = fenPosition.split("/");
    const matrix: (string | null)[][] = [];

    for (const row of rows) {
        const currentRow: (string | null)[] = [];
        for (const char of row) {
            if (!isNaN(Number(char))) {
                // Si c'est un  chiffre, on ajoute dans la matrice autant de cases vides que le chiffre (en notation FEN, une succesion de cases vides est représentée par un chiffre totalisant ces cases)
                const emptyCount = Number(char);
                for (let i = 0; i < emptyCount; i++) {
                    currentRow.push(null);
                }
            } else {
                // Sinon, c'est une pièce, on l'ajoute dans la matrice
                currentRow.push(char);
            }
        }
        matrix.push(currentRow);
    }
    return matrix;
}


const getSquareName = (row: number, col: number): string => {
    const file = String.fromCharCode(97 + col);
    const rank = 8 - row;
    return `${file}${rank}`;
}



export const computeHeatmap = (fens: string[]): Heatmap => {
    const heatmap: Heatmap = {};

    if (fens.length < 2) {
        // Si on a moins de 2 positions, on ne calcule pas de heatmap, c'est un choix afin d'éviter de compter les positions de départ
        return heatmap;
    }

    for (let i = 1; i < fens.length; i++) {
        // On commence à 1 pour comparer chaque position avec la précédente
        // On utilise .split(" ")[0] pour ne récupérer que la partie FEN de la position
        const previousMatrix = fenToMatrix(fens[i - 1].split(" ")[0]);
        const currentMatrix = fenToMatrix(fens[i].split(" ")[0]);

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) { 
                const previousPiece = previousMatrix[row][col];
                const currentPiece = currentMatrix[row][col];

                if (previousPiece !== currentPiece) {
                    // Si la case a changé, on incrémente le compteur
                    const squareName = getSquareName(row, col);
                    heatmap[squareName] = (heatmap[squareName] || 0) + 1;
                }
            }
        }
    }

    return heatmap;
};