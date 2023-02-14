import React, { useEffect, useReducer, useState } from "react";
import { initialState, reducer, ACTION } from "../assets/AiAssets/AiState";
import AiCalculator from "../assets/AiAssets/AiCalculator";
import AiPossibleMoves from "../assets/AiAssets/AiPossibleMoves";
import AiDecidesMove from "../assets/AiAssets/AiDecidesMove";
import Grid from "../assets/Grid";
import WhoWon from "../assets/WhoWon";
import { motion } from "framer-motion";
export default function Play2() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [
    boardState,
    setBoardState,
    allColumns,
    diagonalOne,
    diagonalTwo,
    sides,
    sidesIndex,
    cornersIndex,
  ] = AiCalculator();

  const [playerWon, setPlayerWon] = useState(false);

  const [playerTurn, setPlayerTurn] = useState(null);

  const [moveCount, setMoveCount] = useState(0);

  const [isMoveScanned, setIsMoveScanned] = useState(false);

  const [playerFirst, setPlayerFirst] = useState(true);

  const [animatedCellsX, setAnimatedCellsX] = useState([]);

  function newGame() {
    if (playerFirst) {
      setPlayerTurn("O");
    } else if (!playerFirst) {
      setPlayerTurn("X");
    }
    setMoveCount(1);
    setPlayerWon(false);
    dispatch({ type: ACTION.RESET });
    setBoardState([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
  }

  function playerGoesFirst() {
    newGame();
    setPlayerFirst(true);
    setPlayerTurn("O");
  }
  function aiGoesFirst() {
    newGame();
    setPlayerFirst(false);
    setPlayerTurn("X");
  }

  useEffect(() => {
    WhoWon(boardState, setPlayerWon, "X");
    WhoWon(boardState, setPlayerWon, "O");
  }, [boardState]);

  useEffect(() => {
    AiPossibleMoves({
      boardState,
      playerWon,
      playerTurn,
      moveCount,
      setIsMoveScanned,
      allColumns,
      diagonalOne,
      diagonalTwo,
      sides,
      sidesIndex,
      cornersIndex,
      playerFirst,
      dispatch,
    });
  }, [playerTurn]);

  useEffect(() => {
    AiDecidesMove({
      boardState,
      setBoardState,
      playerWon,
      playerTurn,
      setPlayerTurn,
      moveCount,
      setMoveCount,
      playerFirst,
      animatedCellsX,
      setAnimatedCellsX,
      state,
    });
  }, [isMoveScanned]);

  useEffect(() => {
    newGame();
  }, []);

  function DisplayWinner() {
    function gameState() {
      if (playerWon && playerWon !== "Draw") {
        return <p>Player {playerWon} has won the game</p>;
      } else if (playerWon && playerWon === "Draw") {
        return <p>Its a Draw</p>;
      }
    }
    return <div>{gameState()}</div>;
  }

  return (
    <div className="absolute h-full w-full bg-white ">
      <div className="flex h-full  flex-col  items-center">
        <p className="absolute mt-[40px]  flex font-Titillium text-3xl sm:text-4xl font-bold">
          TIC TAC TOE
        </p>
        <div className="absolute mt-[80px] flex  font-Titillium">
          <DisplayWinner />
        </div>
        <div className="relative mt-[120px] flex flex-col  items-center justify-center">
          <Grid
            boardState={boardState}
            setBoardState={setBoardState}
            playerWon={playerWon}
            playerTurn={playerTurn}
            setPlayerTurn={setPlayerTurn}
            animatedCellsX={animatedCellsX}
            setAnimatedCellsX={setAnimatedCellsX}
          />
          <div className="relative mt-10 flex flex-col gap-5 font-Titillium sm:text-3xl  text-xl ">
            <div className="relative flex gap-10 ">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer border-2 border-black bg-[#85FFF2] p-2"
                onClick={playerGoesFirst}
              >
                Go First
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer border-2 border-black bg-[#85FFF2] p-2"
                onClick={aiGoesFirst}
              >
                Go Second
              </motion.div>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex cursor-pointer justify-center border-2 border-black bg-[#879FE8] p-2 text-center"
              onClick={newGame}
            >
              Restart Game
            </motion.div>
          </div>
        </div>
        <p className="absolute bottom-2 right-2 text-xs text-black">
          P.S. It's not winnable 🙂
        </p>
      </div>
    </div>
  );
}
