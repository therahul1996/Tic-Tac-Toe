import React, { useState } from 'react';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white'
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

function Square({value, onClick}) {
  return (
    <div
      className="square"
      style={squareStyle} onClick={onClick}>
        {value}
    </div>
  );
}

function Board({isNext, squares, onplay, resetData}) {
  function handleSquareClick(i) {
    if(calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquare = squares.slice();
    if (isNext) {
      nextSquare[i] = 'X'
    }
    else{
      nextSquare[i] = 'O'
    }
    onplay(nextSquare);
  }
  const winner = calculateWinner(squares);
  let status;
  let nextRound;
  if (winner) {
    status = winner;
  }else{
    nextRound = (isNext ? 'X' : 'O');
  }
  
  // if (winner) {
  //   nextRound = (!isNext ? 'X' : 'O')
  // }
  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>Next player: <span>{nextRound}</span></div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>Winner: <span>{status}</span></div>
      <button style={buttonStyle} onClick={resetData}>Reset</button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          <Square value={squares[0]} onClick={() => handleSquareClick(0)} />
          <Square value={squares[1]} onClick={() => handleSquareClick(1)} />
          <Square value={squares[2]} onClick={() => handleSquareClick(2)} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square value={squares[3]} onClick={() => handleSquareClick(3)} />
          <Square value={squares[4]} onClick={() => handleSquareClick(4)} />
          <Square value={squares[5]} onClick={() => handleSquareClick(5)} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square value={squares[6]} onClick={() => handleSquareClick(6)} />
          <Square value={squares[7]} onClick={() => handleSquareClick(7)} />
          <Square value={squares[8]} onClick={() => handleSquareClick(8)} />
        </div>
      </div>
    </div>
  );
}

function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0)
  const isNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function resetData () {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }
  function handlePlay(nextSquare) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquare];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  return (
    <div className="game">
      <div className="game-board">
        <Board isNext={isNext} squares={currentSquares} onplay={handlePlay} resetData={resetData} />
      </div>
    </div>
  );
}
function calculateWinner (squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}
export default App;
