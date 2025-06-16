import React, { useState } from 'react';

// PUBLIC_INTERFACE
/**
 * WebTicTacToe
 * Main container for a two-player Tic Tac Toe game.
 * Features:
 *   - 3x3 grid UI
 *   - Player move handling and turn management
 *   - Status display for current player, winner, or draw
 * Styling leverages provided color scheme: primary (#4CAF50), secondary (#FFC107), accent (#2196F3), light theme.
 */
function WebTicTacToe() {
  // 3x3 board, null means empty, 'X' or 'O'
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [isGameOver, setGameOver] = useState(false);
  const winner = calculateWinner(board);

  // PUBLIC_INTERFACE
  // Handles a player's move on the board.
  // Argument: idx (number) - index of the clicked cell.
  const handleMove = (idx) => {
    if (board[idx] || winner || isGameOver) return; // no move if game over or cell is filled
    const newBoard = board.slice();
    newBoard[idx] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);

    if (calculateWinner(newBoard)) {
      setGameOver(true);
    } else if (newBoard.every((cell) => cell)) {
      setGameOver(true); // Draw
    } else {
      setXIsNext(!xIsNext);
    }
  };

  // PUBLIC_INTERFACE
  // Resets the game to its initial state.
  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setGameOver(false);
  };

  // Status Message Calculation
  let status;
  if (winner) {
    status = (
      <span>
        <span style={{ color: winner === 'X' ? '#4CAF50' : '#2196F3' }}>
          Player {winner}
        </span> wins!
      </span>
    );
  } else if (isGameOver && !winner) {
    status = <span style={{ color: '#FFC107' }}>It's a draw!</span>;
  } else {
    status = (
      <span>
        Next move:{" "}
        <span style={{ color: xIsNext ? '#4CAF50' : '#2196F3' }}>
          Player {xIsNext ? 'X' : 'O'}
        </span>
      </span>
    );
  }

  // Inline styles for custom colors and light theme
  const palette = {
    '--primary': '#4CAF50',
    '--secondary': '#FFC107',
    '--accent': '#2196F3',
    '--light': '#fff',
    '--grid-bg': '#f7f9fa',
    '--square-hover': '#e3f2fd',
  };

  return (
    <div
      className="ttt-container"
      style={{
        ...palette,
        background: 'var(--light)',
        borderRadius: 16,
        boxShadow: '0 2px 8px 0 rgba(33,33,33,0.07)',
        maxWidth: 340,
        margin: '32px auto',
        padding: '32px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h2 style={{ color: '#4CAF50', margin: 0, fontWeight: 700, marginBottom: 18 }}>
        WebTicTacToe
      </h2>
      <div
        className="status"
        style={{
          minHeight: 32,
          marginBottom: 16,
          fontWeight: 500,
          fontSize: '1.18rem',
          color: '#212121',
        }}
      >
        {status}
      </div>
      <div
        className="ttt-board"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 60px)',
          gridTemplateRows: 'repeat(3, 60px)',
          gap: 4,
          background: '#f7f9fa',
          borderRadius: 8,
          border: '2px solid #4CAF50',
          marginBottom: 20,
        }}
      >
        {board.map((cell, idx) => (
          <button
            key={idx}
            className="ttt-cell"
            style={{
              width: 60,
              height: 60,
              fontSize: '2.1rem',
              fontWeight: 'bold',
              color:
                cell === 'X'
                  ? '#4CAF50'
                  : cell === 'O'
                  ? '#2196F3'
                  : '#212121',
              background: '#fff',
              border: '1.4px solid #d3dde8',
              borderRadius: 6,
              cursor: cell || winner || isGameOver ? 'not-allowed' : 'pointer',
              outline: 'none',
              transition: 'background 0.18s',
            }}
            onClick={() => handleMove(idx)}
            disabled={!!cell || isGameOver}
            aria-label={`cell ${idx + 1}`}
            onMouseOver={e =>
              !cell && !isGameOver
                ? (e.currentTarget.style.background = '#e3f2fd')
                : undefined
            }
            onMouseOut={e =>
              (e.currentTarget.style.background = '#fff')
            }
          >
            {cell}
          </button>
        ))}
      </div>
      <button
        className="btn btn-large"
        style={{
          background: '#2196F3',
          color: '#fff',
          padding: '9px 20px',
          borderRadius: 5,
          border: 'none',
          fontWeight: 600,
          fontSize: '1rem',
          cursor: 'pointer',
          marginTop: 8,
        }}
        onClick={handleReset}
      >
        {isGameOver ? 'Restart Game' : 'Reset'}
      </button>
    </div>
  );
}

/*
  Determines the winner of a Tic Tac Toe board.
  Input: squares (array) - the board state
  Returns: 'X', 'O', or null
*/
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}

export default WebTicTacToe;
