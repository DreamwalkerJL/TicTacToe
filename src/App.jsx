import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Frontpage from "./Pages/Frontpage";
import PlayAi from "./Pages/PlayAi";
import Play2 from "./Pages/Play2";
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Frontpage />} />
          <Route path="/playai" element={<PlayAi />} />
          <Route path="/play2" element={<Play2 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
