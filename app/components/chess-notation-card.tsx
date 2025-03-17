"use client";

import { Info } from "lucide-react";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

export const ChessNotationCard = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  // Exposer la méthode setIsOpen pour permettre l'ouverture depuis l'extérieur
  useImperativeHandle(ref, () => ({
    setIsOpen,
  }));

  // Afficher automatiquement la modale lors de la première visite
  useEffect(() => {
    const hasSeenIntro = localStorage.getItem("chessHeatmapIntroSeen");
    if (!hasSeenIntro) {
      setIsOpen(true);
      localStorage.setItem("chessHeatmapIntroSeen", "true");
    }
  }, []);

  const handleCopyPGN = () => {
    const pgn = `[Event "Jose Raul Capablanca - Gonzalez Manchon Juan Miguel (1941.??.??)"]
[Site "Habana (Cuba)"]
[Date "1941.??.??"]
[Round "?"]
[White "Jose Raul Capablanca"]
[Black "Gonzalez Manchon Juan Miguel"]
[Result "1/2-1/2"]
[TimeControl ""]
[Link "https://www.chess.com/fr/games/view/35425"]

1. e4 e6 2. Nc3 d5 3. Nf3 d4 4. Ne2 c5 5. c3 Nc6 6. d3 e5 7. g3 Nf6 8. c4 Be7 9.
Bg2 O-O 10. h3 b5 11. b3 bxc4 12. bxc4 Qa5+ 13. Bd2 Qa3 14. Qb3 Qxb3 15. axb3
Rb8 16. Nc1 Bd7 17. Kd1 Ne8 18. Ne1 Nd6 19. f4 f6 20. Kc2 a5 21. Nf3 Ra8 22. Ne2
Rfb8 23. Ra3 Nf7 24. Rha1 Bd8 25. g4 Nb4+ 26. Bxb4 cxb4 27. R3a2 a4 28. Nd2 a3
29. Rf1 Be7 30. Kb1 Bd6 31. Nf3 Nd8 32. f5 Nb7 33. Nc1 Nc5 34. Raf2 Kf7 35. Ka2
h6 36. Rh1 Bc6 37. Re2 Rd8 38. h4 Rac8 39. Bf1 Ke7 40. g5 hxg5 41. hxg5 Rh8 42.
Reh2 Rxh2+ 43. Rxh2 fxg5 44. Nxg5 Kf6 45. Nh7+ Kf7 46. Be2 Be7 47. Bh5+ Kg8 48.
Bg6 Be8 49. Bxe8 Rxe8 50. Kb1 Ra8 51. Rh5 Kf7 52. Ng5+ Bxg5 53. Rxg5 Rh8 54. Rg2
Rh1 55. Kc2 Rxc1+ 56. Kxc1 Nxb3+ 57. Kb1 Nc5 58. Rg6 Nxd3 59. Rb6 Nc5 60. Rxb4
Nxe4 61. Rb7+ Kf6 62. Ka2 d3 63. Rd7 d2 64. Kxa3 Kxf5 65. Kb4 Kf4 66. c5 Nxc5
67. Kxc5 e4 68. Rxd2 1/2-1/2`;

    navigator.clipboard.writeText(pgn);
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="ml-2 text-gray-400 hover:text-white transition-colors flex items-center gap-1"
        onClick={() => setIsOpen(true)}
      >
        <Info className="h-4 w-4" />
        <span className="hidden sm:inline">Aide</span>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[580px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              📜 Aide à l&apos;utilisation
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4">
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue="item-1"
            >
              {/* Intro : Pourquoi cette application ? */}
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-semibold">
                  🎯 Pourquoi Chess Heatmap ?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mt-2 text-muted-foreground">
                    Cette application te permet de visualiser les zones les plus
                    utilisées sur un échiquier au cours d&apos;une partie
                    d&apos;échecs. Tu peux ainsi analyser le positionnement, les
                    pressions, les schémas typiques… ou simplement mieux
                    comprendre une partie.
                  </p>
                  <p className="mt-2 text-muted-foreground italic">
                    Par exemple : tu veux savoir où les pièces blanches exercent
                    le plus de pression dans une ouverture italienne ? Charge la
                    partie et laisse la heatmap parler.
                  </p>
                </AccordionContent>
              </AccordionItem>

              {/* Fonctionnement */}
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-semibold">
                  📥 Comment ça marche ?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mt-2 text-muted-foreground">
                    1. Copie-colle un PGN (fichier texte contenant les coups
                    d&apos;une partie) dans le champ prévu ci-dessus.
                    <br />
                    2. L&apos;échiquier affichera la dernière position.
                    <br />
                    3. Une heatmap viendra colorer les cases selon le nombre de
                    fois où elles ont été occupées par une pièce.
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground italic">
                    Plus une case a été fréquentée, plus sa couleur est intense.
                  </p>
                </AccordionContent>
              </AccordionItem>

              {/* PGN Explication */}
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-semibold">
                  📝 C&apos;est quoi un PGN ?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mt-2 text-muted-foreground">
                    Le <strong>PGN (Portable Game Notation)</strong> est un
                    format standard pour enregistrer une partie d&apos;échecs.
                    Il inclut les noms des joueurs, la date, le résultat, et
                    surtout la liste complète des coups joués.
                  </p>

                  <div className="bg-muted/50 p-3 mt-3 rounded-md border border-border relative">
                    <div className="absolute top-2 right-2 text-xs bg-muted px-2 py-0.5 rounded text-foreground">
                      Exemple de PGN
                    </div>
                    <pre className="text-sm text-foreground whitespace-pre-wrap">
                      {`[Event "Jose Raul Capablanca - Gonzalez Manchon Juan Miguel (1941.??.??)"]
[Site "Habana (Cuba)"]
[Date "1941.??.??"]
[Round "?"]
[White "Jose Raul Capablanca"]
[Black "Gonzalez Manchon Juan Miguel"]
[Result "1/2-1/2"]
[TimeControl ""]
[Link "https://www.chess.com/fr/games/view/35425"]

1. e4 e6 2. Nc3 d5 3. Nf3 d4 4. Ne2 c5 5. c3 Nc6 6. d3 e5 7. g3 Nf6 8. c4 Be7 9.
Bg2 O-O 10. h3 b5 11. b3 bxc4 12. bxc4 Qa5+ 13. Bd2 Qa3 14. Qb3 Qxb3 15. axb3
Rb8 16. Nc1 Bd7 17. Kd1 Ne8 18. Ne1 Nd6 19. f4 f6 20. Kc2 a5 21. Nf3 Ra8 22. Ne2
Rfb8 23. Ra3 Nf7 24. Rha1 Bd8 25. g4 Nb4+ 26. Bxb4 cxb4 27. R3a2 a4 28. Nd2 a3
29. Rf1 Be7 30. Kb1 Bd6 31. Nf3 Nd8 32. f5 Nb7 33. Nc1 Nc5 34. Raf2 Kf7 35. Ka2
h6 36. Rh1 Bc6 37. Re2 Rd8 38. h4 Rac8 39. Bf1 Ke7 40. g5 hxg5 41. hxg5 Rh8 42.
Reh2 Rxh2+ 43. Rxh2 fxg5 44. Nxg5 Kf6 45. Nh7+ Kf7 46. Be2 Be7 47. Bh5+ Kg8 48.
Bg6 Be8 49. Bxe8 Rxe8 50. Kb1 Ra8 51. Rh5 Kf7 52. Ng5+ Bxg5 53. Rxg5 Rh8 54. Rg2
Rh1 55. Kc2 Rxc1+ 56. Kxc1 Nxb3+ 57. Kb1 Nc5 58. Rg6 Nxd3 59. Rb6 Nc5 60. Rxb4
Nxe4 61. Rb7+ Kf6 62. Ka2 d3 63. Rd7 d2 64. Kxa3 Kxf5 65. Kb4 Kf4 66. c5 Nxc5
67. Kxc5 e4 68. Rxd2 1/2-1/2`}
                    </pre>
                    <button
                      className="mt-2 text-xs underline text-primary hover:text-primary/80"
                      onClick={handleCopyPGN}
                    >
                      📋 Copier ce PGN
                    </button>
                  </div>

                  <p className="mt-4 text-sm text-muted-foreground font-mono">
                    Certains PGN très complexes peuvent ne pas être reconnus.
                    Dans ce cas, tu peux copier uniquement la liste des coups
                    (ex: &quot;1. e4 e5 2. Nf3 Nc6...&quot;).
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
});

ChessNotationCard.displayName = "ChessNotationCard"