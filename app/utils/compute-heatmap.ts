import { Heatmap } from "../types/heatmap";

export const computeHeatmap = (fens: string[]): Heatmap => {
    const heatmap: Heatmap = {};

    fens.forEach((fen) => {
        const board = fen.split(" ")[0]; // Pour chaque fen on extrait uniquement la partie sur la position des pièces
        const rows = board.split("/"); // On sépare les lignes de l'échiquier

        // Pas sur de l'algo vu le résultat obtenu
        rows.forEach((row, rowIndex) => {   
            const rank = 8 - rowIndex; // On commence par la 8ème rangée
            let file = 0; // On commence par la colonne a 

            for (const char of row) {
                if (!isNaN(Number(char))) {
                    // Si c'est un nombre, ça représente des cases vides dans l'échiquier, donc on incrémente le compteur de colonne
                    file += Number(char);
                } else {
                    // Sinon, c'est une pièce, on l'ajoute à la heatmap
                    const square = `${String.fromCharCode(97 + file)}${rank}`; // 97 est le code ASCII de 'a', on incrémente pour obtenir la lettre de la colonne
                    heatmap[square] = (heatmap[square] || 0) + 1; // On incrémente le compteur de la case
                    file++;
                }
            }
        });

    });

    console.log('HeatMap : ', heatmap);
    
    return heatmap;
};