import React from "react";
import GameBoard from "./components/GameBoard";
import Reset from "./components/Reset";

function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <GameBoard></GameBoard>
          <Reset></Reset>
        </div>
      </div>
    </div>
  );
}

export default App;
