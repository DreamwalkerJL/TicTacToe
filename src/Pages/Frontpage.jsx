import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Frontpage() {
  const navigate = useNavigate();
  return (
    <div>
      <Link to="/playai">
        <button>Play vs AI</button>
      </Link>
    </div>
  );
}