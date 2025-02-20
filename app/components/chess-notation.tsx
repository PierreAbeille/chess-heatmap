"use client";

export const ChessNotationInfo = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        📜 PGN aux échecs
      </h2>

      {/* PGN Section */}
      <section className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700">
          ♟️ Qu’est-ce qu’un PGN ?
        </h3>
        <p className="mt-2 text-gray-700">
          Le <strong>PGN (Portable Game Notation)</strong> est un format utilisé
          pour enregistrer une partie entière d’échecs, coup par coup. Il
          contient les noms des joueurs, la date et le résultat de la partie.
        </p>
        <div className="bg-white p-4 mt-3 rounded-lg shadow-sm border border-gray-300">
          <pre className="text-sm text-gray-800 whitespace-pre-wrap">
        {`[Event "Championnat"]
[Site "Paris"]
[Date "2024.02.19"]
[White "Joueur A"]
[Black "Joueur B"]
[Result "1-0"]

1. e4 e5 2. Nf3 Nc6 3. Bb5 a6`}
          </pre>
        </div>
      </section>
    </div>
  );
};