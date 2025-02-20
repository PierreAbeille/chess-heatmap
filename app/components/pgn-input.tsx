"use client";

import { useState } from "react";
import { useGameContext } from "../context/game-context";

export const PGNInput: React.FC = () => {
    const { parseAndSetPGN, fens } = useGameContext();
    const [input, setInput] = useState<string>("");

    return (
      <div className="max-w-3xl mx-auto py-6">
        <textarea
          className="w-full p-2 border border-gray-300 rounded-2xl text-cyan-950"
          rows={4}
          placeholder="Collez votre PGN ici..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="mt-2 p-2 bg-blue-500 text-white rounded"
          onClick={() => parseAndSetPGN(input)}
        >
          Charger PGN
        </button> 

        {/* Affichage des FEN */}
        {/* {fens.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-bold">FEN générés :</h3>
            <ul className="list-disc pl-4">
                {fens.length}
              {fens.map((fen, index) => (
                <li key={index} className="text-sm font-mono mt-1">
                  {fen}
                </li>
              ))}
            </ul>
          </div>
        )} */}
      </div>
    );
};