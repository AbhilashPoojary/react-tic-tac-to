import React from "react";

export default function PlayerInfo({ fmove, moveCount }) {
  return (
    <div className="flex justify-between">
      <span
        className={`${
          fmove ? "bg-green-700" : "bg-red-700"
        } text-xl text-white px-4 py-2 rounded transition-opacity duration-600 ease-in-out ${
          moveCount % 2 === 0 ? "opacity-100" : "opacity-0"
        }`}
      >
        Go Player 1!
      </span>
      <span
        className={`${
          fmove ? "bg-green-700" : "bg-red-700"
        } text-xl text-white px-4 py-2 rounded transition-opacity duration-600 ease-in-out ${
          moveCount % 2 !== 0 ? "opacity-100" : "opacity-0"
        }`}
      >
        Go Player 2!
      </span>
    </div>
  );
}
