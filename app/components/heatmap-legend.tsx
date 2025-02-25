"use client";

import React from "react";
import { useGameContext } from "../context/game-context";

export const HeatmapLegend: React.FC = () => {
  // Pour notre dégradé, on fixe la valeur minimale à 2% (la limite de getSquareColor)
  // et la valeur maximale à 100% (valeur arbitraire représentant le max).
  // On calcule manuellement la couleur de départ et d'arrivée à l'aide de ta fonction getSquareColor.
  // Pour percentage = 2:
  //   normalized = log(3) / log(101) ≈ 0.238
  //   red   = floor(110 * (1 - 0.238) + 170 * 0.238) ≈ 124
  //   green = floor(230 * (1 - 0.238)) ≈ 175
  //   blue  = floor(255 * (1 - 0.238) + 230 * 0.238) ≈ 249
  // Donc couleur de départ : rgb(124,175,249)
  //
  // Pour percentage = 100:
  //   normalized = log(101)/log(101) = 1
  //   red   = 170, green = 0, blue = 230
  // Donc couleur d'arrivée : rgb(170,0,230)

  const {minScale, setMinScale} = useGameContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinScale(parseInt(event.target.value, 10))
  }

  return (
    <div className="flex flex-col items-center mt-4">
      <span className="min-w-full text-white">
        Prise d'occupation d&apos;une case par une pièce en %
      </span>
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={minScale}
        onChange={handleChange}
        className="w-full max-w-full my-2 h-4 appearance-none cursor-pointer rounded-full"
        style={{
          background:
            "linear-gradient(to right, rgb(124,175,249), rgb(170,0,230))",
        }}
      />
      <div className="flex justify-between w-full max-w-full mt-1 text-sm text-white">
        <span>{minScale}%</span>
        <span>100%</span>
      </div>
    </div>
  );
};
