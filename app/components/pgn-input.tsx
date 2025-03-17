"use client";

import { useState } from "react";
import { useGameContext } from "../context/game-context";
import { Button } from "./ui/button";

export const PGNInput: React.FC = () => {
    const { parseAndSetPGN } = useGameContext();
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
        <Button
          variant="outline"
          size="w_full"
          onClick={() => parseAndSetPGN(input)}
        >
          Charger PGN
        </Button> 

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