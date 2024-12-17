import './TickTacToe.css';
import {useState} from 'react';

function Square({value, onSquareClick}){
  return (
  <>
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  </>
  );
}

function Row({id, values, handleClick}){
  return <div className="board-row">
    <Square value={values[0]} onSquareClick={()=>handleClick(id*3-3)}></Square>
    <Square value={values[1]} onSquareClick={()=>handleClick(id*3-2)}></Square>
    <Square value={values[2]} onSquareClick={()=>handleClick(id*3-1)}></Square>
  </div>
}


function Board({xIsNext, squares, onPlay}){

  function onSquareClick(i){
    if(squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice()
    const val = xIsNext ? "X" : "O"
    nextSquares[i] = val;
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return <>
    <div className="status">{status}</div>
    <Row id={1} values={squares.slice(0,3)} handleClick={onSquareClick}/>
    <Row id={2} values={squares.slice(3,6)} handleClick={onSquareClick}/>
    <Row id={3} values={squares.slice(6,9)} handleClick={onSquareClick}/>
  </>
}

export default function Game(){
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0)
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(index){
    setCurrentMove(index)
    let nextHistory
    if(index === 0){
      nextHistory = [...history.slice(0, 1)];
    } 
    else if(index === history.length-1){
      nextHistory = [...history.slice()];
    }
    else if(index !== history.length-1){
      nextHistory = [...history.slice(0, index+1)];
    }

    setHistory(nextHistory)
  }

  const moves = history.map(
    (squares, index)=>{
      let text = "";
      if(index > 0){
        text = `Click to go to #${index}`;
      }
      else{
        text = "Click to go to start";
      }
      return (<li key={index}>
        <button onClick={() => {jumpTo(index)}}>{text}</button>
      </li>)
    }
  );

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
function calculateWinner(squares) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}