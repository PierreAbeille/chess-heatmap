"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button"

interface IntroBannerProps {
  onOpenHelp: () => void;
}

export const IntroBanner = ({ onOpenHelp }: IntroBannerProps) => {
  const [isVisible, setIsVisible] = useState(true);

  // Vérifier si la bannière a déjà été fermée
  useEffect(() => {
    const bannerClosed = localStorage.getItem("chessHeatmapBannerClosed");
    if (bannerClosed) {
      setIsVisible(false);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("chessHeatmapBannerClosed", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="w-full p-4 mb-6 flex items-center justify-between bg-zinc-800/90 rounded-2xl">
      <div>
        <h3 className="font-medium text-foreground text-white">
          Première visite sur Chess Heatmap ?
        </h3>
        <p className="text-sm text-muted-foreground">
          Découvrez comment analyser vos parties d&apos;échecs avec notre outil de
          visualisation.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          onClick={onOpenHelp}
          variant="outline"
          size="sm"
          className="whitespace-nowrap"
        >
          Comment ça marche
        </Button>
        <Button
          onClick={handleClose}
          variant="ghost"
          size="icon"
          className="text-muted-foreground"
        >
          <span className="sr-only">Fermer</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </Button>
      </div>
    </div>
  );
};
