import React from "react";

export default function Board({
  row,
  rowIdx,
  highlightedCells,
  handleBoardClick,
}) {
  return (
    <div key={rowIdx} className="grid grid-cols-3 bg-001f3f">
      {row.map((cell, cellIdx) => (
        <div
          key={cellIdx}
          className={`${
            cell === "X" ? "text-red-700" : cell === "O" ? "text-green-700" : ""
          } cell p-4 border-x border-y cursor-pointer font-bold text-3xl text-center h-[70px] ${
            highlightedCells.some(
              (highlightedCell) =>
                highlightedCell.row === rowIdx &&
                highlightedCell.col === cellIdx
            )
              ? " bg-black text-white"
              : ""
          }`}
          onClick={() => handleBoardClick(rowIdx, cellIdx)}
        >
          {cell}
        </div>
      ))}
    </div>
  );
}
