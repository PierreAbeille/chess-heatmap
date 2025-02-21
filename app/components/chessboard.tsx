"use client";

import React from "react";
import { Chessboard } from "react-chessboard";
import { useGameContext } from "../context/game-context";

export const ChessboardComponent: React.FC = () => {
    const {chess, fens, heatmap} = useGameContext();
    
    //disable eslint for this line
    // eslint-disable-next-line
    // const [squareStyles, setSquareStyles] = useState<{[key: string]: React.CSSProperties}>({
    //     e4: { backgroundColor: "red" },
    // });

    const customBoardStyle= {
        borderRadius: "1rem",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
    };

    const customDarkSquareStyle = {
      backgroundColor: "#716757",
    };

    const customLightSquareStyle = {
      backgroundColor: "#fffcf8",
    };

    const totalPositions = fens.length;
    const normalizedHeatmap = Object.fromEntries(
        Object.entries(heatmap).map(([square, count]) => [
            square,
            (count / totalPositions) * 100, // Normalize the count to a percentage
        ])
    );

    const getSquareColor = (percentage: number) => {
      if (percentage <= 2) return "transparent";

      // Interpolation logarithmique pour éviter une dominance de rouge
      const normalized = Math.log(1 + percentage) / Math.log(101); // Normalisation sur 0-1

      // Dégradé de bleu pâle (173, 216, 230) à violet (128, 0, 255)
      const red = Math.floor(110 * (1 - normalized) + 170 * normalized);
      const green = Math.floor(230 * (1 - normalized)); // Diminue progressivement
      const blue = Math.floor(255 * (1 - normalized) + 230 * normalized);

      return `rgba(${red}, ${green}, ${blue}, 1)`; // Opacité de 0.6
    };

    const getSquareStyle = (
      percentage: number,
      square: "a1" | "h1" | "a8" | "h8"
    ) => {
      if (percentage <= 2) return {};

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
      <div className="flex justify-center items-center">
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
