import { useContext, useState } from "react";

// Based on the boardState find all the sides, corners, columns and the two diagonals.
//
// This is used for calculation of the AI to play its next move. Specifically
// if for example a column has two 'X' the AI will block it on its next move.

export default function AiCalculator() {
  const [boardState, setBoardState] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  const allColumns = [[], [], []];
  const diagonalOne = [];
  const diagonalTwo = [];

  const sides = [
    boardState[0][1],
    boardState[1][0],
    boardState[1][2],
    boardState[2][1],
  ];

  const sidesIndex = [
    [0, 1],
    [1, 0],
    [1, 2],
    [2, 1],
  ];

  const cornersIndex = [
    [0, 0],
    [0, 2],
    [2, 0],
    [2, 2],
  ];

  for (let a = 0; a < 3; a++) {
    allColumns[0].push(boardState[a][0]);
    allColumns[1].push(boardState[a][1]);
    allColumns[2].push(boardState[a][2]);

    diagonalOne.push(boardState[a][a]);

    diagonalTwo.push(boardState[2 - a][a]);
  }

  return [
    boardState,
    setBoardState,
    allColumns,
    diagonalOne,
    diagonalTwo,
    sides,
    sidesIndex,
    cornersIndex,
  ];
}
