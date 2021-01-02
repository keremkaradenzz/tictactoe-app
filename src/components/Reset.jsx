import React from 'react';

 
//Create Reset Game Buttons
const Reset = () => {

    const resetGame = () => window.location.reload()
    return(
        <div className="col-12">
            <button className="btn btn-primary mt-3  " onClick={resetGame}>Reset Game</button>
        </div>
    )

}
export default Reset;