import React, { useState } from "react";
import Players from "./components/Players.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

const INITIAL_GAMEBOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

const App = () => {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...INITIAL_GAMEBOARD.map((innerArray) => [...innerArray])];

  function handlePlayerChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  let hasWinner = "";

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].col];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      hasWinner = players[firstSquareSymbol];
    }
  }

  const hasDraw = gameTurns.length === 9 && !hasWinner;

  function handleSelectSqare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Players
            symbol="X"
            initialPlayerName={PLAYERS.X}
            isActive={activePlayer === "X"}
            onChange={handlePlayerChange}
          />
          <Players
            symbol="O"
            initialPlayerName={PLAYERS.O}
            isActive={activePlayer === "O"}
            onChange={handlePlayerChange}
          />
        </ol>
        {(hasWinner || hasDraw) && (
          <GameOver winner={hasWinner} onRestart={handleRestart} />
        )}
        <GameBoard onSelect={handleSelectSqare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
};

export default App;
