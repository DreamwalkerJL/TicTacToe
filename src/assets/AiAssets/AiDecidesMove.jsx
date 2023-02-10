// Based on the AiState & moveCount, Ai decides which move to do
export default function AiwhichMove({
  boardState,
  setBoardState,
  playerWon,
  playerTurn,
  setPlayerTurn,
  moveCount,
  setMoveCount,
  playerFirst,
  state,
}) {
  const boardStateCopy = [...boardState];
  setMoveCount((prev) => prev + 1);
  setPlayerTurn("O");
  setBoardState(boardStateCopy);

  if (moveCount >= 1 && !playerWon && playerTurn === "X") {
    // First Move -> If middle open, go middle. If middle is taken, go random corner.
    if (boardStateCopy[1][1] === null && playerFirst === true) {
      boardStateCopy[1][1] = playerTurn;

      return;
    } else if (state.first === "O" && moveCount === 1) {
      function getRandomZeroOrTwo() {
        return Math.round(Math.random()) * 2;
      }
      boardStateCopy[getRandomZeroOrTwo()][getRandomZeroOrTwo()] = playerTurn;

      return;
    }

    // First Move -> Random Field - (AI FIRST SPECIFIC)
    if (moveCount === 1 && playerFirst === false) {
      function getRandomIndexOne() {
        return Math.floor(Math.random() * 3);
      }
      function getRandomIndexTwo() {
        return Math.floor(Math.random() * 3);
      }
      boardStateCopy[getRandomIndexOne()][getRandomIndexTwo()] = playerTurn;

      return;
    }

    // Go for Win
    if (typeof state.win[0] === "number") {
      boardStateCopy[state.win[0]][state.win[1]] = playerTurn;

      return;
    }

    // Go for Fork - (AI FIRST SPECIFIC)
    if (typeof state.fork[0] === "number") {
      console.log("HELLO");
      boardStateCopy[state.fork[0]][state.fork[1]] = playerTurn;

      return;
    }

    // Go for double side - (AI FIRST SPECIFIC)
    if (typeof state.doubleSide[0] === "number") {
      boardStateCopy[state.doubleSide[0]][state.doubleSide[1]] = playerTurn;

      return;
    }

    // Block Win
    if (typeof state.blockWin[0] === "number") {
      boardStateCopy[state.blockWin[0]][state.blockWin[1]] = playerTurn;

      return;
    }

    // Block Fork
    if (typeof state.blockFork === "number") {
      boardStateCopy[state.blockFork[0]][state.blockFork[1]] = playerTurn;

      return;
    }

    // Go Middle when still open - (AI FIRST SPECIFIC)
    if (moveCount === 2 && boardState[1][1] === null && playerFirst === false) {
      console.log("POP");
      boardStateCopy[1][1] = playerTurn;

      return;
    }

    // Second field for a straight-line win
    console.log("fwef");
    if (typeof state.secondFieldForWin[0] === "number") {
      boardState[state.secondFieldForWin[0]][state.secondFieldForWin[1]] =
        playerTurn;

      return;
    }

    //Block double side
    if (typeof state.blockDoubleSide[0] === "number") {
      boardStateCopy[state.blockDoubleSide[0]][state.blockDoubleSide[1]] =
        playerTurn;

      return;
    }

    // Fills a normal move, which doesnt involve a win, block or fork
    if (typeof state.noPurposeField[0] === "number") {
      boardStateCopy[state.noPurposeField[0]][state.noPurposeField[1]] =
        playerTurn;

      return;
    }
  }
}
