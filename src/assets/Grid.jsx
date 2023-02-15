import { useState } from "react";
import Lottie from "react-lottie-player";
import OChar from "./Images/Ochar.json";
import XChar from "./Images/Xchar.json";
import Xpic from "./Images/X.png";
import Opic from "./Images/O.png";
import { motion } from "framer-motion";

export default function Grid({
  boardState,
  setBoardState,
  playerWon,
  playerTurn,
  setPlayerTurn,
  animatedCellsX,
}) {
  const [animatedCellsO, setAnimatedCellsO] = useState([]);
  function toggleFieldPlayerOne(row, column) {
    if (!playerWon && playerTurn === "O" && boardState[row][column] === null) {
      const boardStateCopy = [...boardState];
      boardStateCopy[row][column] = playerTurn;
      setAnimatedCellsO([`${row}-${column}`]);
      setBoardState(boardStateCopy);
      setPlayerTurn("X");
    }
  }

  function Cell({ cell, rowIndex, columnIndex }) {
    const isAnimatedO = animatedCellsO.includes(`${rowIndex}-${columnIndex}`);
    const isAnimatedX = animatedCellsX.includes(`${rowIndex}-${columnIndex}`);

    function CellPlayed() {
      function CellO() {
        if (isAnimatedO && cell === "O" && !playerWon) {
          return (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
              {cell}
            </motion.div>
          );
        } else if (cell === "O") {
          return <motion.div>{cell}</motion.div>;
        }
      }
      function CellX() {
        if (isAnimatedX && cell === "X" && !playerWon) {
          return (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              {cell}
            </motion.div>
          );
        } else if (cell === "X") {
          return (
            <motion.div
              initial={{ rotateX: 0 }}
              animate={{ rotate: 360 }}
              transition={{ type: "spring" }}
            >
              {cell}
            </motion.div>
          );
        }
      }
      return (
        <div>
          <CellO />
          <CellX />
        </div>
      );
    }

    function hoverAniIfCellNull() {
      if (cell !== null) {
        return { scale: 1 };
      } else if (cell === null) {
        return { scale: 0.95 };
      }
    }

    return (
      <button onClick={() => toggleFieldPlayerOne(rowIndex, columnIndex)}>
        <motion.div
          whileHover={hoverAniIfCellNull()}
          className="relative grid h-20  w-20 items-center justify-center bg-[#A1D3FF] text-center text-2xl sm:h-32 sm:w-32 sm:text-5xl"
        >
          <CellPlayed />
        </motion.div>
      </button>
    );
  }

  return (
    <div className="inline-block border-[2px] border-black sm:border-[3px]">
      <div className="grid grid-cols-3 gap-[2px] bg-black sm:gap-[3px] ">
        {boardState.map((row, rowIndex) =>
          row.map((cell, columnIndex) => (
            <Cell
              key={`${columnIndex}-${rowIndex}`}
              cell={cell}
              rowIndex={rowIndex}
              columnIndex={columnIndex}
            />
          ))
        )}
      </div>
    </div>
  );
}
