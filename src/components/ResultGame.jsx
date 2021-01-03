import React,{useState,useEffect}from "react";

const ResultGame = ({ playerResult, value,movementPlayer , player }) => {
  // winning nummers
  const [shows,setShow] = useState(true)
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
  let winnigNumbers=[];
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
      winnigNumbers = newArr[i]; 
    
      break;
    } else if (winnigO === Number(value)) {
      winnigNumbers = newArr[i];
   
      break;
    }
  }
  useEffect(()=>{
    if(playerResult.indexOf(null) === -1)
    {
      for(let k = 0 ; k < movementPlayer.length ; k++) // true numbers is disabled
      {
        document.getElementById(`${k}`).setAttribute("disabled", "");
      }
      setShow(false); 
    }
    for(let i = 0 ; i< winnigNumbers.length ; i++)  // true numbers is bgcolor green
    {
      document.getElementById(`${winnigNumbers[i]}`).style.backgroundColor="green";
      setShow(false); 

    }
    if(winnigNumbers.length>0)
    {
      for(let k = 0 ; k < movementPlayer.length ; k++) // true numbers is disabled
      {
        document.getElementById(`${k}`).setAttribute("disabled", "");
      }
    }
    if(!shows)
    {
      document.getElementById("next-player").innerHTML="";
    }
    
  })
 
  // calculate draw game
  if (playerResult.indexOf(null) === -1) {
    draw++;
  }

  const playAgain = () => window.location.reload();  
  console.log(movementPlayer);
  console.log(playerResult);
  return (
    <>
      {player ?(
        <p id="next-player" className="fs-3 ">Next Player X</p>
      ) : (
        <p   id="next-player" className="fs-3">Next Player O</p>
      )}
      <p className="fs-4 fsw-bold">Result Game</p>
      {winnigX === Number(value) ?  (
       
        <p>winner X  <button className="btn btn-success " onClick={playAgain}>
        Play Again
      </button> </p>
        
      ) : winnigO ===  Number(value) ? (
        <p>winner O  <button className="btn btn-success " onClick={playAgain}>
        Play Again
      </button></p>
      ) : draw > 0 ? (
        <p> draw </p>
      ) : (
        ""
      )}
      {draw > 0 ? (
        <button className="btn btn-success " onClick={playAgain}>
          Play Again
        </button>
      ) : (
        ""
      )}
      <ul>
        <li>1. Game Start! (Player X Begins) // First action is starting the game and Player X begins</li>
        {  playerResult.map((item,index) => 
             item!==null ? <li>Move triggered ({item}) {movementPlayer[index].split(',').reverse().join(',')} //  ({item}) letter placed on the {movementPlayer[index].split(',').reverse().join(',')} location of the board</li> : ""
        )}
          {winnigX === Number(value) ? (
        <li>Game Finshed! (Player X Winner)</li>
      ) : winnigO ===  Number(value) ? (
        <li>Game Finshed! (Player O Winner)</li>
      ) : draw > 0 ? (
        <li> Game Finshed! (Draw)</li>
      ) : (
        ""
      )}
      </ul>
    </>
  );
};

export default ResultGame;
