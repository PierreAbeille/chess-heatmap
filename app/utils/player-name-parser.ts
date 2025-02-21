export const parsePlayerNames = (pgn: string): { white: string; black: string } => {
    const whiteMatch = pgn.match(/\[White "(.+?)"\]/);
    const blackMatch = pgn.match(/\[Black "(.+?)"\]/);

    return {
        white: whiteMatch ? whiteMatch[1] : "Joueur Blanc",
        black: blackMatch ? blackMatch[1] : "Joueur Noir",
    };
};