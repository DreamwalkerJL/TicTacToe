import React, { useReducer } from "react";
import AiCalculator from "./AiCalculator";
import { initialState, reducer, ACTION } from "./AiState";

// Update the AiState, on which moves are possible for the AI
export default function ScanningPossibleMoves({
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
}) {
  dispatch({ type: ACTION.RESET });
  if (!playerWon && playerTurn === "X") {
    const sidesIndexO = sides.findIndex((cell) => cell === "O");
    const sidesIndexX = sides.findIndex((cell) => cell === "X");
    const sidesNull = sides.findIndex((cell) => cell === null);

    function ThreeSidedCoinflip() {
      return Math.floor(Math.random() * 3);
    }

    // First move

    if (boardState[1][1] === null) {
      dispatch({ type: ACTION.FIRST, payload: null });
    } else if (boardState[1][1] === "O") {
      dispatch({ type: ACTION.FIRST, payload: "O" });
    } else if (moveCount === 1 && playerFirst === false) {
      dispatch({ type: ACTION.FIRST, payload: "X" });
    }
    // if(playerFirst === false && moveCount === 1 && ThreeSidedCoinflip ===) {
    //   dispatch({type: ACTION.FIRST, payload: 'O'})
    // }

    // Block double side
    if (sidesIndexO !== -1 && moveCount === 2) {
      let corner = sidesIndexO;
      if (corner === 1) {
        corner = 2;
      } else if (corner === 2) {
        corner = 1;
      }

      dispatch({
        type: ACTION.BLOCKDOUBLESIDE,
        payload: [cornersIndex[corner][0], cornersIndex[corner][1]],
      });
    }

    // Go for double side - (AI FIRST SPECIFIC)
    if (
      sidesIndexX !== -1 &&
      boardState[1][1] === "O" &&
      moveCount === 2 &&
      playerFirst === false
    ) {
      let side = sidesIndexX;
      if (side === 0) {
        side = 1;
      } else if (side === 1) {
        side = 3;
      } else if (side === 2) {
        side = 0;
      } else if (side === 3) {
        side = 1;
      }

      dispatch({
        type: ACTION.DOUBLESIDE,
        payload: [sidesIndex[side][0], sidesIndex[side][1]],
      });
    }

    for (let i = 0; i < 3; i++) {
      // Rows
      const rowO = boardState[i].filter((cell) => cell === "O");
      const rowX = boardState[i].filter((cell) => cell === "X");
      const rowNull = boardState[i].filter((cell) => cell === null);
      const rowNullIndex = boardState[i].findIndex((cell) => cell === null);

      // Row - go for win
      if (rowX.length === 2 && rowNullIndex !== -1) {
        dispatch({ type: ACTION.WIN, payload: [i, rowNullIndex] });
      }

      // Row - block win
      if (rowO.length === 2 && rowNullIndex !== -1) {
        dispatch({ type: ACTION.BLOCKWIN, payload: [i, rowNullIndex] });
      }

      // Row - no purpose move
      if (rowNullIndex !== -1) {
        dispatch({ type: ACTION.NOPURPOSEFIELD, payload: [i, rowNullIndex] });
      }

      // Row - second field for win
      if (rowX.length === 1 && rowNull.length === 2) {
        dispatch({
          type: ACTION.SECONDFIELDFORWIN,
          payload: [i, rowNullIndex],
        });
      }

      // Columns
      const columnO = allColumns[i].filter((cell) => cell === "O");
      const columnX = allColumns[i].filter((cell) => cell === "X");
      const columnNull = allColumns[i].filter((cell) => cell === null);
      const columnNullIndex = allColumns[i].findIndex((cell) => cell === null);

      // Column - go for win
      if (columnX.length === 2 && columnNullIndex !== -1) {
        dispatch({ type: ACTION.WIN, payload: [columnNullIndex, i] });

        // Column - block win
      } else if (columnO.length === 2 && columnNullIndex !== -1) {
        dispatch({ type: ACTION.BLOCKWIN, payload: [columnNullIndex, i] });
      }

      // Column - second field for win
      if (columnX.length === 1 && columnNull.length === 2) {
        dispatch({
          type: ACTION.SECONDFIELDFORWIN,
          payload: [columnNullIndex, i],
        });
      }
    }

    //Diagonal One
    const diagonalOneO = diagonalOne.filter((cell) => cell === "O");
    const diagonalOneX = diagonalOne.filter((cell) => cell === "X");
    const diagonalOneNull = diagonalOne.filter((cell) => cell === null);
    const diagonalOneNullIndex = diagonalOne.findIndex((cell) => cell === null);

    // Diagonal one - go for win
    if (diagonalOneX.length === 2 && diagonalOneNullIndex !== -1) {
      dispatch({
        type: ACTION.WIN,
        payload: [diagonalOneNullIndex, diagonalOneNullIndex],
      });
    }

    // Diagonal one - block win
    if (diagonalOneO.length === 2 && diagonalOneNullIndex !== -1) {
      dispatch({
        type: ACTION.BLOCKWIN,
        payload: [diagonalOneNullIndex, diagonalOneNullIndex],
      });
    }

    // Diagonal one - second field for win
    if (diagonalOneX.length === 1 && diagonalOneNull.length === 2) {
      dispatch({
        type: ACTION.SECONDFIELDFORWIN,
        payload: [diagonalOneNullIndex, diagonalOneNullIndex],
      });
    }

    // Diagonal one - (AI FIRST SPECIFIC) - go for Fork
    if (
      diagonalOneX.length === 1 &&
      boardState[1][1] === "O" &&
      moveCount === 2 &&
      playerFirst === false
    ) {
      dispatch({
        type: ACTION.FORK,
        payload: [diagonalOneNullIndex, diagonalOneNullIndex],
      });
    }

    //Diagonal Two
    const diagonalTwoO = diagonalTwo.filter((cell) => cell === "O");
    const diagonalTwoX = diagonalTwo.filter((cell) => cell === "X");
    const diagonalTwoNull = diagonalTwo.filter((cell) => cell === null);
    const diagonalTwoNullIndex = diagonalTwo.findIndex((cell) => cell === null);

    function diagonalTwoColumnIndex() {
      let columnIndex = 0;
      if (diagonalTwoNullIndex === 0) {
        columnIndex = 2;
      } else if (diagonalTwoNullIndex === 1) {
        columnIndex = 1;
      }
      return columnIndex;
    }

    // Diagonal two - go for win
    if (diagonalTwoX.length === 2 && diagonalTwoNullIndex !== -1) {
      dispatch({
        type: ACTION.WIN,
        payload: [diagonalTwoColumnIndex(), diagonalTwoNullIndex],
      });
    }

    // Diagonal two - block win
    if (diagonalTwoO.length === 2 && diagonalTwoNullIndex !== -1) {
      dispatch({
        type: ACTION.BLOCKWIN,
        payload: [diagonalTwoColumnIndex(), diagonalTwoNullIndex],
      });
    }

    // Diagonal one - second field for win
    if (diagonalTwoX.length === 1 && diagonalTwoNull.length === 2) {
      dispatch({
        type: ACTION.SECONDFIELDFORWIN,
        payload: [diagonalTwoColumnIndex(), diagonalTwoNullIndex],
      });
    }

    // Diagonal one & two - block fork
    if (
      (diagonalOneO.length === 2 &&
        boardState[1][1] === "X" &&
        moveCount === 2) ||
      (diagonalTwoO.length === 2 && boardState[1][1] === "X" && moveCount === 2)
    ) {
      let coord = sidesIndex[sidesNull];
      dispatch({ type: ACTION.BLOCKFORK, payload: [coord[0], coord[1]] });
    }

    setIsMoveScanned((prev) => !prev);
  }
}
