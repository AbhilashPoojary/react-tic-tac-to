import React from "react";

export default function Selection({ gameInfo, setPlayers }) {
  function updateSelection(val) {
    gameInfo(val);
    setPlayers(
      val ? { player1: "O", player2: "X" } : { player1: "X", player2: "O" }
    );
  }
  return (
    <div className="border p-3 bg-001f3f text-white">
      <h3 className="text-center text-xl font-bold">
        Would you like to be X or O{" "}
      </h3>
      <div className="flex gap-6 justify-center">
        <button
          className="text-red-700 text-3xl font-bold"
          onClick={() => updateSelection(false)}
        >
          X
        </button>
        <button
          className="text-green-700 text-3xl font-bold"
          onClick={() => updateSelection(true)}
        >
          O
        </button>
      </div>
    </div>
  );
}
