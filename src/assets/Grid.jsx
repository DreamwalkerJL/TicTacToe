export default function Grid({
  boardState,
  setBoardState,
  playerWon,
  playerTurn,
  setPlayerTurn,
}) {
  function toggleFieldPlayerOne(row, column) {
    if (!playerWon && playerTurn === "O" && boardState[row][column] === null) {
      const boardStateCopy = [...boardState];
      boardStateCopy[row][column] = playerTurn;

      setBoardState(boardStateCopy);
    
      setPlayerTurn("X");
    }
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
