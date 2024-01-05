import { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import Selection from "./components/Selection";
import PlayerInfo from "./components/PlayerInfo";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [boardArr, setBoardArr] = useState(
    new Array(3).fill(0).map((row) => new Array(3).fill(""))
  );
  const [gover, setGover] = useState(false);
  const [highlightedCells, setHighlightedCells] = useState([]);
  const [fmove, setFmove] = useState(true);
  const [start, setStart] = useState(false);
  const [gameType, setGameType] = useState("");
  const [moveCount, setMoveCount] = useState(0);
  const [players, setPlayers] = useState({ player1: "", player2: "" });
  function handleBoardClick(rowId, colId) {
    let checkClickVal = boardArr[rowId][colId];
    if (gover || checkClickVal) {
      return;
    }
    setMoveCount((prev) => prev + 1);
    const updatedBoard = [...boardArr];
    updatedBoard[rowId][colId] = fmove ? "O" : "X";
    setBoardArr(updatedBoard);
    setFmove(!fmove);
  }
  function tictacto(arr) {
    const winningCells = [];
    for (let i = 0; i < arr.length; i++) {
      if (
        arr[i].every((item) => item === "X") ||
        arr[i].every((item) => item === "O")
      ) {
        setGover(true);
        winningCells.push(...arr[i].map((_, j) => ({ row: i, col: j })));
      }
    }

    for (let j = 0; j < arr[0].length; j++) {
      const column = arr.map((row) => row[j]);
      if (
        column.every((item) => item === "X") ||
        column.every((item) => item === "O")
      ) {
        setGover(true);
        winningCells.push(...column.map((_, i) => ({ row: i, col: j })));
      }
    }

    const mainDiagnol = arr.map((item, i) => item[i]);
    if (
      mainDiagnol.every((item) => item === "X") ||
      mainDiagnol.every((item) => item === "O")
    ) {
      setGover(true);
      winningCells.push(...mainDiagnol.map((_, i) => ({ row: i, col: i })));
    }

    const antiDiagnol = arr.map((item, i) => item[arr.length - 1 - i]);
    if (
      antiDiagnol.every((item) => item === "X") ||
      antiDiagnol.every((item) => item === "O")
    ) {
      setGover(true);
      winningCells.push(
        ...antiDiagnol.map((_, i) => ({ row: i, col: arr.length - 1 - i }))
      );
    }

    setHighlightedCells(winningCells);
  }

  function gameInfo(move) {
    setFmove(move);
    setStart(true);
  }

  function resetGame() {
    setMoveCount(0);
    setBoardArr(new Array(3).fill(0).map((row) => new Array(3).fill("")));
    setGover(false);
    setHighlightedCells([]);
  }

  useEffect(() => {
    tictacto(boardArr);
    const checkEmpty = boardArr
      .map((row) => row.every((col) => col !== ""))
      .every((item) => item);
    if (checkEmpty && !gover) {
      toast("Ooops draw");
    }
    console.log(checkEmpty);
  }, [fmove]);
  useEffect(() => {
    setTimeout(() => {
      if (gover) {
        toast((t) => (
          <span>
            {fmove ? (
              <span className="font-bold text-red-700">X</span>
            ) : (
              <span className="font-bold text-green-700">O</span>
            )}{" "}
            won the game
          </span>
        ));
      }
    }, 100);
  }, [gover]);
  return (
    <>
      <div className="mt-5">
        <h3 className="text-3xl text-center text-001f3f font-bold">
          Tic tac to
        </h3>
        <div className="w-[300px] my-5 mx-auto relative">
          {start && !gover && (
            <PlayerInfo fmove={fmove} moveCount={moveCount} />
          )}
          {start && (
            <div className=" flex justify-between border p-2">
              <div
                className={`${
                  fmove ? "text-green-700" : "text-red-700"
                } font-bold`}
              >
                Player 1: 0
              </div>
              <div
                className={`${
                  fmove ? "text-green-700" : "text-red-700"
                } font-bold`}
              >
                Player 2: 0
              </div>
              <div className="cursor-pointer font-bold">Reset all</div>
            </div>
          )}
          {start ? (
            boardArr.map((row, rowIdx) => (
              <Board
                key={rowIdx}
                row={row}
                rowIdx={rowIdx}
                handleBoardClick={handleBoardClick}
                highlightedCells={highlightedCells}
              />
            ))
          ) : (
            <Selection gameInfo={gameInfo} setPlayers={setPlayers} />
          )}
          {start && (
            <div className="reset-btn absolute">
              <button
                className="bg-red-700 py-1 px-2 text-sm rounded-sm text-white"
                onClick={() => resetGame()}
              >
                Reset
              </button>
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default App;
