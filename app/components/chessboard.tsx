"use client";

import React from "react";
import { Chessboard } from "react-chessboard";
import { useGameContext } from "../context/game-context";

export const ChessboardComponent: React.FC = () => {
    const {chess, fens, heatmap} = useGameContext();
    console.log(chess);
    
    //disable eslint for this line
    // eslint-disable-next-line
    // const [squareStyles, setSquareStyles] = useState<{[key: string]: React.CSSProperties}>({
    //     e4: { backgroundColor: "red" },
    // });

    const customBoardStyle= {
        borderRadius: "5px",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
    };

    const customDarkSquareStyle= {
        backgroundColor: "#769656",
    };

    const customLightSquareStyle = {
        backgroundColor: "#eeeed2",
    };

    const totalPositions = fens.length;
    const normalizedHeatmap = Object.fromEntries(
        Object.entries(heatmap).map(([square, count]) => [
            square,
            (count / totalPositions) * 100, // Normalize the count to a percentage
        ])
    );

    const getSquareColor = (percentage: number) => {
        if (percentage <= 5) return "transparent";

        // Interpolation logarithmique pour éviter une dominance de rouge
        const normalized = Math.log(1 + percentage) / Math.log(101); // Normalisation sur 0-1

        const red = Math.floor(255 * normalized);
        const green = Math.floor(255 * (1 - normalized));

        return `rgba(${red}, ${green}, 0, 0.9)`; // Opacité de 0.6
    };

    const getSquareStyle = (percentage: number) => {
        if (percentage <= 5) return {};
        return {
            backgroundColor: getSquareColor(percentage),
            border: "1px solid rgba(0, 0, 0, 0.2)",
        };
    }

    return (
        <div className="flex justify-center items-center">
            <Chessboard
                id="chessboard"
                position={chess.fen()}
                customSquareStyles={
                    Object.fromEntries(
                        Object.entries(normalizedHeatmap).map(([square, percentage]) => [
                            square,
                            getSquareStyle(percentage),
                        ])
                    )
                }
                customBoardStyle={customBoardStyle}
                customDarkSquareStyle={customDarkSquareStyle}
                customLightSquareStyle={customLightSquareStyle}
            />
        </div>
    );
}
