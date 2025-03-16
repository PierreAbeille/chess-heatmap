"use client";

import React from "react";
import { Chessboard } from "react-chessboard";
import { useGameContext } from "../context/game-context";
import { PlayersBanner } from "./players-banner";

export const ChessboardComponent: React.FC = () => {
  const { chess, heatmap, pgn, minScale } = useGameContext();
  //disable eslint for this line
  // eslint-disable-next-line
  // const [squareStyles, setSquareStyles] = useState<{[key: string]: React.CSSProperties}>({
  //     e4: { backgroundColor: "red" },
  // });

  const customBoardStyle = {
    borderRadius: "1rem",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
  };

  const customDarkSquareStyle = {
    backgroundColor: "#716757",
  };

  const customLightSquareStyle = {
    backgroundColor: "#fffcf8",
  };

  const exponent = 1.1; // 🔧 Augmenter pour amplifier les petites différences
  const maxOccupancy = Math.max(...Object.values(heatmap), 1);
  const normalizedHeatmap = Object.fromEntries(
    Object.entries(heatmap).map(([square, count]) => [
      square,
      Math.pow(count / maxOccupancy, exponent) * 100, // Normalisation en pourcentage
    ])
  );

  const getSquareColor = (percentage: number) => {
    if (percentage < minScale) return "transparent";

    // Dégradé de bleu pâle (110, 230, 255) à violet (170, 0, 230)
    // Interpolation pour le dégradé bleu → violet
    const normalized = Math.pow(percentage / 100, 0.7);
    const red = Math.floor(110 * (1 - normalized) + 170 * normalized);
    const green = Math.floor(230 * (1 - normalized));
    const blue = Math.floor(255 * (1 - normalized) + 230 * normalized);

    return `rgba(${red}, ${green}, ${blue}, 1)`;
  };

  const getSquareStyle = (
    percentage: number,
    square: "a1" | "h1" | "a8" | "h8"
  ) => {
    const baseStyle = {
      backgroundColor: getSquareColor(percentage),
      border: "1px solid rgba(0, 0, 0, 0.2)",
    };

    const cornerRadius = "1rem";
    const corners = {
      a1: { borderBottomLeftRadius: cornerRadius },
      h1: { borderBottomRightRadius: cornerRadius },
      a8: { borderTopLeftRadius: cornerRadius },
      h8: { borderTopRightRadius: cornerRadius },
    };

    return {
      ...baseStyle,
      ...corners[square],
    };
  };

  return (
    <div>
      {pgn && <PlayersBanner />}
      <Chessboard
        id="chessboard"
        position={chess.fen()}
        customSquareStyles={Object.fromEntries(
          Object.entries(normalizedHeatmap).map(([square, percentage]) => [
            square,
            getSquareStyle(percentage, square as "a1" | "h1" | "a8" | "h8"),
          ])
        )}
        customBoardStyle={customBoardStyle}
        customDarkSquareStyle={customDarkSquareStyle}
        customLightSquareStyle={customLightSquareStyle}
        isDraggablePiece={() => false}
      />
    </div>
  );
}
