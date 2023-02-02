import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import FieldProp from "../Tools/FieldProp";

export default function PlayAi() {
  const [field, setField] = useState(fieldArray());

  const fieldElements = field.map((field) => (
    <FieldProp
      key={field.id}
      position={field.position}
      isFilled={field.isFilled}
      toggleP={() => toggleFieldPlayer(field.position)}
    />
  ));

  function startGame() {
    setField(fieldArray());
  }

  const [checked, setChecked] = useState(0);
  function isChecked() {
    if (checked > 2 && checked < 20000) {
      setChecked(1);
    }
    if (
      g1Filter.length === 3 ||
      g2Filter.length === 3 ||
      g3Filter.length === 3 ||
      g4Filter.length === 3 ||
      g5Filter.length === 3 ||
      g6Filter.length === 3 ||
      g7Filter.length === 3 ||
      g8Filter.length === 3
    ) {
      setChecked(10000);
    } else if (g1AnyOpen.length === 1 && g1WinMove.length === 2)
      return setChecked((prev) => prev + 100);
    else if (g2AnyOpen.length === 1 && g2WinMove.length === 2)
      return setChecked((prev) => prev + 200);
    else if (g3AnyOpen.length === 1 && g3WinMove.length === 2)
      return setChecked((prev) => prev + 300);
    else if (g4AnyOpen.length === 1 && g4WinMove.length === 2)
      return setChecked((prev) => prev + 400);
    else if (g5AnyOpen.length === 1 && g5WinMove.length === 2)
      return setChecked((prev) => prev + 500);
    else if (g6AnyOpen.length === 1 && g6WinMove.length === 2)
      return setChecked((prev) => prev + 600);
    else if (g7AnyOpen.length === 1 && g7WinMove.length === 2)
      return setChecked((prev) => prev + 700);
    else if (g8AnyOpen.length === 1 && g8WinMove.length === 2)
      return setChecked((prev) => prev + 800);
    else if (g1AnyOpen.length === 1 && g1Filter.length === 2)
      return setChecked((prev) => prev + 10);
    else if (g2AnyOpen.length === 1 && g2Filter.length === 2)
      return setChecked((prev) => prev + 20);
    else if (g3AnyOpen.length === 1 && g3Filter.length === 2)
      return setChecked((prev) => prev + 30);
    else if (g4AnyOpen.length === 1 && g4Filter.length === 2)
      return setChecked((prev) => prev + 40);
    else if (g5AnyOpen.length === 1 && g5Filter.length === 2)
      return setChecked((prev) => prev + 50);
    else if (g6AnyOpen.length === 1 && g6Filter.length === 2)
      return setChecked((prev) => prev + 60);
    else if (g7AnyOpen.length === 1 && g7Filter.length === 2)
      return setChecked((prev) => prev + 70);
    else if (g8AnyOpen.length === 1 && g8Filter.length === 2)
      return setChecked((prev) => prev + 80);
    else if (checked >= 10) {
      return setChecked(1);
    } else {
      return setChecked((prev) => prev + 1);
    }
  }

  const [playerMoves, setPlayerMoves] = useState(0);
  const [ttt, setTTT] = useState(0);

  function toggleFieldPlayer(p) {
    setPlayerMoves((prev) => prev + 1);
    setField((prevField) =>
      prevField.map((field) => {
        return field.position === p && field.isFilled === null
          ? { ...field, isFilled: 1 }
          : field;
      })
    );
  }
  const g1 = [field[0], field[1], field[2]];
  const g1AnyOpen = g1.filter((element) => element.isFilled === null);
  const g1WinMove = g1.filter((element) => element.isFilled === 2);
  const g1Filter = g1.filter((element) => element.isFilled === 1);

  const g2 = [field[3], field[4], field[5]];
  const g2AnyOpen = g2.filter((element) => element.isFilled === null);
  const g2WinMove = g2.filter((element) => element.isFilled === 2);
  const g2Filter = g2.filter((element) => element.isFilled === 1);

  const g3 = [field[6], field[7], field[8]];
  const g3AnyOpen = g3.filter((element) => element.isFilled === null);
  const g3WinMove = g3.filter((element) => element.isFilled === 2);
  const g3Filter = g3.filter((element) => element.isFilled === 1);

  const g4 = [field[0], field[3], field[6]];
  const g4AnyOpen = g4.filter((element) => element.isFilled === null);
  const g4WinMove = g4.filter((element) => element.isFilled === 2);
  const g4Filter = g4.filter((element) => element.isFilled === 1);

  const g5 = [field[1], field[4], field[7]];
  const g5AnyOpen = g5.filter((element) => element.isFilled === null);
  const g5WinMove = g5.filter((element) => element.isFilled === 2);
  const g5Filter = g5.filter((element) => element.isFilled === 1);

  const g6 = [field[2], field[5], field[8]];
  const g6AnyOpen = g6.filter((element) => element.isFilled === null);
  const g6WinMove = g6.filter((element) => element.isFilled === 2);
  const g6Filter = g6.filter((element) => element.isFilled === 1);

  const g7 = [field[0], field[4], field[8]];
  const g7AnyOpen = g7.filter((element) => element.isFilled === null);
  const g7WinMove = g7.filter((element) => element.isFilled === 2);
  const g7Filter = g7.filter((element) => element.isFilled === 1);

  const g8 = [field[2], field[4], field[6]];
  const g8AnyOpen = g8.filter((element) => element.isFilled === null);
  const g8WinMove = g8.filter((element) => element.isFilled === 2);
  const g8Filter = g8.filter((element) => element.isFilled === 1);

  const notFilled = field.filter((element) => element.isFilled === null);
  console.log(g1WinMove);
  const indexMath = Math.floor(Math.random() * notFilled.length);

  function isAiWinning() {
    if (
      g1WinMove.length === 3 ||
      g2WinMove.length === 3 ||
      g3WinMove.length === 3 ||
      g4WinMove.length === 3 ||
      g5WinMove.length === 3 ||
      g6WinMove.length === 3 ||
      g7WinMove.length === 3 ||
      g8WinMove.length === 3
    ) {
      setChecked(20000);
    }
  }

  const [aiMoves, setAiMoves] = useState(0);

  function aiMove() {
    console.log(checked);
    setAiMoves((prev) => prev + 1);

    // AI Winning Move
    if (playerMoves >= 1 && checked >= 100 && checked < 900) {
      setField((prev) =>
        prev.map((field) => {
          if (
            field.position === g1AnyOpen[0]?.position &&
            g1WinMove.length === 2 &&
            checked >= 100 &&
            checked < 200
          ) {
            return { ...field, isFilled: 2 };
          } else if (
            field.position === g2AnyOpen[0]?.position &&
            g2WinMove.length === 2 &&
            checked >= 200 &&
            checked < 300
          ) {
            return { ...field, isFilled: 2 };
          } else if (
            field.position === g3AnyOpen[0]?.position &&
            g3WinMove.length === 2 &&
            checked >= 300 &&
            checked < 400
          ) {
            return { ...field, isFilled: 2 };
          } else if (
            field.position === g4AnyOpen[0]?.position &&
            g4WinMove.length === 2 &&
            checked >= 400 &&
            checked < 500
          ) {
            return { ...field, isFilled: 2 };
          } else if (
            field.position === g5AnyOpen[0]?.position &&
            g5WinMove.length === 2 &&
            checked >= 500 &&
            checked < 600
          ) {
            return { ...field, isFilled: 2 };
          } else if (
            field.position === g6AnyOpen[0]?.position &&
            g6WinMove.length === 2 &&
            checked >= 600 &&
            checked < 700
          ) {
            return { ...field, isFilled: 2 };
          } else if (
            field.position === g7AnyOpen[0]?.position &&
            g7WinMove.length === 2 &&
            checked >= 700 &&
            checked < 800
          ) {
            return { ...field, isFilled: 2 };
          } else if (
            field.position === g8AnyOpen[0]?.position &&
            g8WinMove.length === 2 &&
            checked >= 800 &&
            checked < 900
          ) {
            return { ...field, isFilled: 2 };
          } else return field;
        })
      );
    }

    // AI Surival Move
    if (playerMoves >= 1 && checked >= 10 && checked < 100) {
      setField((prev) =>
        prev.map((field) => {
          if (
            field.position === g1AnyOpen[0]?.position &&
            g1Filter.length === 2 &&
            checked >= 10 &&
            checked < 20
          ) {
            return { ...field, isFilled: 2 };
          } else if (
            field.position === g2AnyOpen[0]?.position &&
            g2Filter.length === 2 &&
            checked >= 20 &&
            checked < 30
          ) {
            return { ...field, isFilled: 2 };
          } else if (
            field.position === g3AnyOpen[0]?.position &&
            g3Filter.length === 2 &&
            checked >= 30 &&
            checked < 40
          ) {
            return { ...field, isFilled: 2 };
          } else if (
            field.position === g4AnyOpen[0]?.position &&
            g4Filter.length === 2 &&
            checked >= 40 &&
            checked < 50
          ) {
            return { ...field, isFilled: 2 };
          } else if (
            field.position === g5AnyOpen[0]?.position &&
            g5Filter.length === 2 &&
            checked >= 50 &&
            checked < 60
          ) {
            return { ...field, isFilled: 2 };
          } else if (
            field.position === g6AnyOpen[0]?.position &&
            g6Filter.length === 2 &&
            checked >= 60 &&
            checked < 70
          ) {
            return { ...field, isFilled: 2 };
          } else if (
            field.position === g7AnyOpen[0]?.position &&
            g7Filter.length === 2 &&
            checked >= 70 &&
            checked < 80
          ) {
            return { ...field, isFilled: 2 };
          } else if (
            field.position === g8AnyOpen[0]?.position &&
            g8Filter.length === 2 &&
            checked >= 80 &&
            checked < 90
          ) {
            return { ...field, isFilled: 2 };
          } else return field;
        })
      );
    }

    // AI Random Move
    if (playerMoves >= 1 && checked >= 1 && checked < 10) {
      setField((prev) =>
        prev.map((field) => {
          if (field.position === notFilled[indexMath]?.position)
            return { ...field, isFilled: 2 };
          else return field;
        })
      );
    }
  }

  const [winner, setWinner] = useState(null);
  console.log(winner);
  function winnerDecided() {
    if (checked >= 10000 && checked < 20000) {
      setWinner(1);
    } else if (checked >= 20000) {
      setWinner(2);
    }
  }

  useEffect(() => {
    isAiWinning();
  }, [aiMoves]);

  useEffect(() => {
    aiMove();
    winnerDecided();
  }, [checked]);

  useEffect(() => {

    isChecked();
  }, [playerMoves]);

  // function playerWins() {
  //   if (
  //     (field[0].isFilled &&
  //       field[1].isFilled === 1 &&
  //       field[2].isFilled === 1) ||
  //     (field[3].isFilled &&
  //       field[4].isFilled === 1 &&
  //       field[5].isFilled === 1) ||
  //     (field[6].isFilled &&
  //       field[7].isFilled === 1 &&
  //       field[8].isFilled === 1) ||
  //     (field[0].isFilled &&
  //       field[3].isFilled === 1 &&
  //       field[6].isFilled === 1) ||
  //     (field[1].isFilled &&
  //       field[4].isFilled === 1 &&
  //       field[7].isFilled === 1) ||
  //     (field[2].isFilled &&
  //       field[5].isFilled === 1 &&
  //       field[8].isFilled === 1) ||
  //     (field[0].isFilled &&
  //       field[4].isFilled === 1 &&
  //       field[8].isFilled === 1) ||
  //     (field[2].isFilled && field[4].isFilled === 1 && field[6].isFilled === 1)
  //   )
  //     console.log("Player Wins");
  //   else console.log("No Winner Yet");
  // }

  function fieldArray() {
    const fieldArr = [];
    for (let i = 0; i < 9; i++) {
      fieldArr.push({
        position: i,
        isFilled: null,
        id: nanoid(),
      });
    }
    return fieldArr;
  }

  return (
    <div>
      PlayAi<button onClick={startGame}>Start Game</button>
      <div>
        <div className="relative flex row">
          <div>{fieldElements[0]}</div>
          <div>{fieldElements[1]}</div>
          <div>{fieldElements[2]}</div>
        </div>
        <div className="relative flex row">
          <div>{fieldElements[3]}</div>
          <div>{fieldElements[4]}</div>
          <div>{fieldElements[5]}</div>
        </div>
        <div className="relative flex row">
          <div>{fieldElements[6]}</div>
          <div>{fieldElements[7]}</div>
          <div>{fieldElements[8]}</div>
        </div>
      </div>
    </div>
  );
}
