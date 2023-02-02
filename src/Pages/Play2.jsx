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
    const boardStateCopy = [...boardState];
    boardStateCopy[row][column] = playerTurn;
    setBoardState(boardStateCopy);
    setPlayerTurn(() => {
      if (playerTurn === "O") setPlayerTurn("X");
      else setPlayerTurn("O");
    });
  }

  //   function toggleFieldPlayerTwo(row, column) {
  //     const boardStateCopy = [...boardState];
  //     boardStateCopy[row][column] = "X";
  //     setBoardState(boardStateCopy);
  //   }

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
    for (let i = 0; i < boardState.length; i++) {
      let isWinningRow = true;
      let isWinningColumn = true;
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
      if (isWinningRow || isWinningColumn) setPlayerWon(true);
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

  function Grid({ grid }) {
    return (
      <div>
        <div>
          {grid.map((row, rowIndex) =>
            row.map((col, colIndex) => (
              <Cell key={`${colIndex}-${rowIndex}`} cell={cell} />
            ))
          )}
        </div>
      </div>
    );
  }

  function Cell({ cell }) {
    return <div>{cell}</div>;
  }

  function Field() {
    return (
      <div className="relative flex row">
        <div className="bg-slate-400 w-20 h-20 text-center">
          {boardState}
          <div>
            <button onClick={() => toggleFieldPlayerOne(0, 0)}>Player 1</button>
          </div>
        </div>
      </div>
    );
  }
  function Grid() {
    return (
      <div
        style={{ display: "inline-block" }}
        className="border-2 border-black"
      >
        <div className="bg-black grid grid-cols-3 gap-[2px]">
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
      <div className="bg-slate-400 w-20 h-20 text-center ">
        {cell}
        <div>
          <button onClick={() => toggleFieldPlayerOne(rowIndex, columnIndex)}>
            Player 1
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div onClick={newGame}>New Game</div>
      <Grid />
      <div className="relative flex row">
        <div className="bg-slate-400 w-20 h-20 text-center">
          {boardState[0][0]}
          {!playerWon && (
            <div>
              <button onClick={() => toggleFieldPlayerOne(0, 0)}>
                Player 1
              </button>
            </div>
          )}
        </div>
        <div className="bg-slate-400 w-20 h-20 text-center">
          {boardState[0][1]}
          {!playerWon && (
            <div>
              <button onClick={() => toggleFieldPlayerOne(0, 1)}>
                Player 1
              </button>
            </div>
          )}
        </div>
        <div className="bg-slate-400 w-20 h-20 text-center">
          {boardState[0][2]}
          {!playerWon && (
            <div>
              <button onClick={() => toggleFieldPlayerOne(0, 2)}>
                Player 1
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="relative flex row">
        <div className="bg-slate-400 w-20 h-20 text-center">
          {boardState[1][0]}
          {!playerWon && (
            <div>
              <button onClick={() => toggleFieldPlayerOne(1, 0)}>
                Player 1
              </button>
            </div>
          )}
        </div>
        <div className="bg-slate-400 w-20 h-20 text-center">
          {boardState[1][1]}
          {!playerWon && (
            <div>
              <button onClick={() => toggleFieldPlayerOne(1, 1)}>
                Player 1
              </button>
            </div>
          )}
        </div>
        <div className="bg-slate-400 w-20 h-20 text-center">
          {boardState[1][2]}
          {!playerWon && (
            <div>
              <button onClick={() => toggleFieldPlayerOne(1, 2)}>
                Player 1
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="relative flex row">
        <div className="bg-slate-400 w-20 h-20 text-center">
          {boardState[2][0]}
          {!playerWon && (
            <div>
              <button onClick={() => toggleFieldPlayerOne(2, 0)}>
                Player 1
              </button>
            </div>
          )}
        </div>
        <div className="bg-slate-400 w-20 h-20 text-center">
          {boardState[2][1]}
          {!playerWon && (
            <div>
              <button onClick={() => toggleFieldPlayerOne(2, 1)}>
                Player 1
              </button>
            </div>
          )}
        </div>
        <div className="bg-slate-400 w-20 h-20 text-center">
          {boardState[2][2]}
          {!playerWon && (
            <div>
              <button onClick={() => toggleFieldPlayerOne(2, 2)}>
                Player 1
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
