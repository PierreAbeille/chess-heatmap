"use client";

import React from "react";

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

  return (
    <div className="flex flex-col items-center mt-4">
      <span className="min-w-full text-white">
        Occupation d&apos;une case par une pièce en %
      </span>
      <div
        className="w-full max-w-full h-4 rounded-full"
        style={{
          background:
            "linear-gradient(to right, rgb(124,175,249), rgb(170,0,230))",
        }}
      ></div>
      <div className="flex justify-between w-full max-w-full mt-1 text-sm text-white">
        <span>2%</span>
        <span>100%</span>
      </div>
    </div>
  );
};
