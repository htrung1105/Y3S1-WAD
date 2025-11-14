import { useState } from 'react';

function Square({ value, onSquareClick, isWinning }) {
  return (
    <button
      className={`square ${isWinning ? 'winning' : ''}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  const { winner, line } = calculateWinner(squares);

  function handleClick(i) {
    if (winner || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares, i);
  }

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (squares.every(Boolean)) {
    status = 'Draw';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      {Array(3)
        .fill(null)
        .map((_, rowIndex) => (
          <div className="board-row" key={rowIndex}>
            {Array(3)
              .fill(null)
              .map((_, colIndex) => {
                const squareIndex = rowIndex * 3 + colIndex;
                return (
                  <Square
                    key={squareIndex}
                    value={squares[squareIndex]}
                    onSquareClick={() => handleClick(squareIndex)}
                    isWinning={line.includes(squareIndex)}
                  />
                );
              })}
          </div>
        ))}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null), location: null }]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;

  function handlePlay(nextSquares, i) {
    const newHistory = history.slice(0, currentMove + 1);
    const newCurrent = {
      squares: nextSquares,
      location: {
        row: Math.floor(i / 3) + 1,
        col: (i % 3) + 1,
      },
    };
    setHistory([...newHistory, newCurrent]);
    setCurrentMove(newHistory.length);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function resetGame() {
    setHistory([{ squares: Array(9).fill(null), location: null }]);
    setCurrentMove(0);
  }

  const moves = history.map((snapshot, move) => {
    let description;
    if (move > 0) {
      const { location } = snapshot;
      description = `move #${move} (${location.row}, ${location.col})`;
    } else {
      description = 'game start';
    }
    if (move === currentMove) {
      return (
        <li key={move}>
          <span>{`You are at ${description}`}</span>
        </li>
      );
    }
    return (
      <li key={move}>
        <button className="button button-move" onClick={() => jumpTo(move)}>{`Go to ${description}`}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <h1>Tic-Tac-Toe</h1>
        <button className="button button-sort" onClick={() => setIsAscending(!isAscending)}>
          {isAscending ? 'Sort: Descending' : 'Sort: Ascending'}
        </button>
        <button className="button button-play-again" onClick={resetGame}>
          Play Again
        </button>
        <h2 className="history-title">History</h2>
        <ol>{isAscending ? moves : [...moves].reverse()}</ol>
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
      return { winner: squares[a], line: lines[i] };
    }
  }
  return { winner: null, line: [] };
}
