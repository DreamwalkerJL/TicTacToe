import React from "react";
import "../App.css";
export default function FieldProp({ position, isFilled, toggleP }) {
  const Marked = {
    backgroundColor: isFilled === 2 || null ? "lightgreen" : "lightpink"
  };
  function Marked2() {
    let bc;
    if (isFilled === null) {
      bc = "white";
    } else if (isFilled === 1) {
      bc = "lightgreen";
    } else if (isFilled == 2) {
      bc = "lightpink";
    } else bc === "white";

    const Marked = {backgroundColor: bc}

    return Marked
  }

  return (
    <div>
      <div onClick={toggleP} className="w-32 h-32 flex relative " style={Marked2()}></div>
    </div>
  );
}
