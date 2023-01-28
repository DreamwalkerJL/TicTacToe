import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Frontpage from "./Pages/Frontpage";
import PlayAi from "./Pages/PlayAi";
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Frontpage />} />
          <Route path="/playai" element={<PlayAi />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
