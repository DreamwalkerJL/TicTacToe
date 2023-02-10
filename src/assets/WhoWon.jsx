export default function playerHasWon(boardState, setPlayerWon, player) {
  let isDraw = true;
  for (let i = 0; i < boardState.length; i++) {
    let isWinningRow = true;
    let isWinningcolumn = true;

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
        isWinningcolumn = false;
        break;
      }
    }
    if (isWinningRow || isWinningcolumn) setPlayerWon(player);
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
    setPlayerWon(player);
  }
}
