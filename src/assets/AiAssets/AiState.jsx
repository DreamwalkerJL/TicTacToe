import React, { useReducer } from "react";

export const ACTION = {
  RESET: "reset",
  FIRST: "first",
  WIN: "win",
  FORK: "fork",
  DOUBLESIDE: "doubleSide",
  BLOCKWIN: "blockWin",
  BLOCKFORK: "blockFork",
  SECONDFIELDFORWIN: "secondFieldForWin",
  BLOCKDOUBLESIDE: "blockDoubleSide",
  NOPURPOSEFIELD: "noPurposeField",
};

export const initialState = {
  first: null,
  win: [],
  fork: [],
  doubleSide: [],
  blockWin: [],
  blockFork: [],
  secondFieldForWin: [],
  blockDoubleSide: [],
  noPurposeField: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "reset":
      return initialState;
    case "first":
      return { ...state, first: action.payload };
    case "win":
      return { ...state, win: action.payload };
    case "fork":
      return { ...state, fork: action.payload };
      case "doubleSide":
        return { ...state, doubleSide: action.payload };
    case "blockWin":
      return { ...state, blockWin: action.payload };
    case "blockFork":
      return { ...state, blockFork: action.payload };
    case "secondFieldForWin":
      return { ...state, secondFieldForWin: action.payload };
    case "blockDoubleSide":
      return { ...state, blockDoubleSide: action.payload };
    case "noPurposeField":
      return { ...state, noPurposeField: action.payload };
  }
};
