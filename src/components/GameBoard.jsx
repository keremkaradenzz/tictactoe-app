import React, { useState } from "react";
import ResultGame from "./ResultGame";
import axios from "axios";
const GameBoard = () => {
  const [value, setValue] = useState(3); // NxN tic tac toe board size
  const [player, setPlayer] = useState(true); // true player X false player O
  const [squares, setSquares] = useState(Array(Math.pow(value,2)).fill(null)); // created item = fill array

  const URL = "http://140.82.59.206/gameLogger.php/"; // POST URL

  // Created Game Board
  let buttonArrays = [];
  const createGameBoard = (x, y) => {
    for (let row = 1; row <= x; row++) {
      //row
      for (let column = 1; column <= y; column++) {
        // column
        buttonArrays.push(`${row},${column}`);
      }
    }

    return buttonArrays;
  };
  // sending data 
  const sendData = (movement,whoPlay) => (
    axios.post(URL, {
        body: {
          'action': `Move triggered (${whoPlay}) (${movement})`
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
   
    )
  const handleClick = (index, item) => (e) => {
    let newArr = [...squares]; // copying the old data array
    if (player) {
    
      sendData(item,'X')
      newArr[index] = "X";
      setPlayer(false); // replace  player
    } else {
     sendData(item,'O')
      newArr[index] = "O";
      setPlayer(true); // replace  player
    }

    setSquares(newArr);
  };

  createGameBoard(value, value); // Created NxN tic tac toe
  return (
    <>
      <div className="col-12">
        <p className="fs-3">Create NxN Tic Tac Toe (Min 3x3 - Max 6x6)</p>
        <input
          type="number"
          onChange={(e) => setValue(e.target.value)}
          min="3" max="6"
          value={value}
        ></input>
       
      </div>
      <br />
      {buttonArrays.map((item, index) => {
        return Math.pow(item.slice(2), 2) === buttonArrays.length ? (
          <span>
            <button
              key={index}
              className="btn btn-primary squares"
              onClick={handleClick(index, item)}
              value={squares[index]}
            >
              {squares[index]}
            </button>
            <br />
          </span>
        ) : (
          <button
            key={index}
            className="btn btn-primary squares"
            onClick={handleClick(index, item)}
            value={squares[index]}
          >
            {squares[index]}
          </button>
        );
      })}
      {player ? (
        <p className="fs-3">Next Player X</p>
      ) : (
        <p className="fs-3">Next Player O</p>
      )}
      <ResultGame
        playerResult={squares}
        value={value}
      />
    </>
  );
};

export default GameBoard;
