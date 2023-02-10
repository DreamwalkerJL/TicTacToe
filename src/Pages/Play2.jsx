import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";

export default function Play2() {
  const [boardState, setBoardState] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  const [playerWon, setPlayerWon] = useState(false);

  const [playerTurn, setPlayerTurn] = useState(null);

  // Functiouns which change the state

  function toggleFieldPlayerOne(row, column) {
    if (!playerWon) {
      const boardStateCopy = [...boardState];
      boardStateCopy[row][column] = playerTurn;

      setBoardState(boardStateCopy);

      setPlayerTurn(() => {
        if (playerTurn === "O") setPlayerTurn("X");
        else setPlayerTurn("O");
      });
    }
  }

  function newGame() {
    let number = Math.floor(Math.random() * 2);
    if (number === 0) {
      setPlayerTurn("O");
    } else setPlayerTurn("X");

    setBoardState([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
  }

  // Functions which interpret the current state

  function playerHasWon(player) {
    let isDraw = true;
    for (let i = 0; i < boardState.length; i++) {
      let isWinningRow = true;
      let isWinningColumn = true;

      for (let j = 0; j < boardState[i].length; j++) {
        if (boardState[i][j] === null) {
          isDraw = false;
          break;
        }
      }

      for (let j = 0; j < boardState[i].length; j++) {
        if (boardState[i][j] !== player) {
          isWinningRow = false;
          break;
        }
      }
      for (let e = 0; e < boardState[i].length; e++) {
        if (boardState[e][i] !== player) {
          isWinningColumn = false;
          break;
        }
      }
      if (isWinningRow || isWinningColumn) setPlayerWon(player);
    }
    if (isDraw) {
      setPlayerWon("Draw");
    }
    if (
      (boardState[0][0] === player &&
        boardState[1][1] === player &&
        boardState[2][2] === player) ||
      (boardState[0][2] === player &&
        boardState[1][1] === player &&
        boardState[2][0] === player)
    ) {
      setPlayerWon(true);
    }
  }

  useEffect(() => {
    playerHasWon("X");
    playerHasWon("O");
  }, [boardState]);

  useEffect(() => {
    newGame();
  }, []);

  function Grid() {
    return (
      <div className="border-2 border-black inline-block">
        <div className="bg-black grid grid-cols-3 gap-[2px] ">
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

  function Cell({ cell, rowIndex, columnIndex }) {
    return (
      <button onClick={() => toggleFieldPlayerOne(rowIndex, columnIndex)}>
        <div className="bg-slate-400 w-20 h-20  text-2xl grid relative justify-center items-center text-center ">
          {cell}
        </div>
      </button>
    );
  }

  function DisplayWinner() {
    function gameState() {
      if (!playerWon) {
        return <p>Next Turn: {playerTurn}</p>;
      } else if(playerWon && playerWon !== "Draw") {
        return <p>Player {playerWon} has won the game</p>
      } else {
        return <p>Its a Draw</p>
      }
    }
    return <div>{gameState()}</div>;
  }

  return (
    <div>
      <DisplayWinner/>
      <Grid />
      <div onClick={newGame}>Restart Game</div>
    </div>
  );
}
