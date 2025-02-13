"use client";

import React, { useState } from "react";
import { Chessboard } from "react-chessboard";

export const ChessboardComponent: React.FC = () => { 
    const [squareStyles, setSquareStyles] = useState<{[key: string]: React.CSSProperties}>({
        e4: { backgroundColor: "red" },
    });

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

    return (
        <div className="flex justify-center items-center">
            <Chessboard
                id="chessboard"
                position="start"
                customSquareStyles={squareStyles}
                customBoardStyle={customBoardStyle}
                customDarkSquareStyle={customDarkSquareStyle}
                customLightSquareStyle={customLightSquareStyle}
            />
        </div>
    );
}
