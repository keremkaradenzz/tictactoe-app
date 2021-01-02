import React from "react";

const ResultGame = ({ playerResult, value }) => {
  // winning nummers
  let winningArrays = [];
  let counter = 0;
  //selected all rows
  for (let i = 0; i < Number(value); i++) {
    winningArrays[i] = [];
    for (let j = 0; j < Number(value); j++) {
      winningArrays[i][j] = counter;
      counter++;
    }
  }
  let newArr = [...winningArrays]; 

  counter = 0;
  // selected all column
  for (let i = 0; i < value; i++) {
    winningArrays[i] = [];
    for (let j = 0; j < Number(value); j++) {
      winningArrays[i][j] = i + counter;
      counter = counter + Number(value);
    }
    counter = 0;
  }
  newArr.push(...winningArrays);

  //selected left diagonal
  let leftDiagonal = [[]];
  for (let j = 0; j < Number(value); j++) {
    counter = counter + (Number(value) - 1);
    leftDiagonal[0][j] = 0 + counter;
  }
  counter = 0;
  let rightDiagonal = [[]];
  //selected right diagonal
  for (let k = 0; k < Number(value); k++) {
    rightDiagonal[0][k] = counter;
    counter = counter + (Number(value) + 1);
  }
  newArr.push(...leftDiagonal, ...rightDiagonal);

  // calculate winnig player
  let winnigX = 0;              
  let winnigO = 0;
  let draw = 0;
  for (let i = 0; i < newArr.length; i++) {
    winnigX = 0;
    winnigO = 0;
    newArr[i].map((item) => {     // winning number array search
      if (playerResult[item] === "X") {
        winnigX++;
      } else if (playerResult[item] === "O") {
        winnigO++;
      }
    });
    if (winnigX === Number(value)) {
      break;
    } else if (winnigO === Number(value)) {
      break;
    }
  }
  // calculate draw game
  if (playerResult.indexOf(null) === -1) {
    draw++;
  }

  const playAgain = () => window.location.reload();  

  return (
    <>
      <p className="fs-4 fsw-bold">Result Game</p>
      {winnigX === Number(value) ? (
        <p>winner X </p>
      ) : winnigO ===  Number(value) ? (
        <p>winner O </p>
      ) : draw > 0 ? (
        <p> draw</p>
      ) : (
        ""
      )}
      {draw > 0 ? (
        <button className="btn btn-success " onClick={playAgain}>
          {" "}
          Play Again{" "}
        </button>
      ) : (
        ""
      )}
    </>
  );
};

export default ResultGame;
