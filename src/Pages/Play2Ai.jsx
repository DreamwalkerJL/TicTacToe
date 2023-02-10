import React, { useEffect, useReducer, useState } from "react";
import { initialState, reducer, ACTION } from "../assets/AiAssets/AiState";
import AiCalculator from "../assets/AiAssets/AiCalculator";
import AiPossibleMoves from "../assets/AiAssets/AiPossibleMoves";
import AiDecidesMove from "../assets/AiAssets/AiDecidesMove";
import Grid from "../assets/Grid";
import WhoWon from "../assets/WhoWon";
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
    console.log(playerFirst);
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
    <div>
      <DisplayWinner />
      <Grid
        boardState={boardState}
        setBoardState={setBoardState}
        playerWon={playerWon}
        playerTurn={playerTurn}
        setPlayerTurn={setPlayerTurn}
      />
      <div onClick={newGame}>Restart Game</div>
      <div onClick={playerGoesFirst}>Go First</div>
      <div onClick={aiGoesFirst}>Go Second</div>
    </div>
  );
}
