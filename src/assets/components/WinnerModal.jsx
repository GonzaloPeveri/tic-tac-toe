import React, { useState } from 'react';
import { Square } from "./Square";

export function WinnerModal({ winner, resetGame, hideWinner, setHideWinner }) {

  return (
    winner !== null && hideWinner === false && (
      <section className="winner">
        <div className="text">
          <button className="toggle-winner-panel" onClick={() => setHideWinner(!hideWinner)}>
            x
          </button>
          <h2>
            {winner === false ? 'Empate' : 'Ganó'}
          </h2>

          <header className="win">
            {winner && <Square squareWinner="true">{winner}</Square>}
          </header>

          <footer>
            <button onClick={resetGame}>Empezar de nuevo</button>
          </footer>
        </div>
      </section>
    )
  )
}