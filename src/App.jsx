import { useState } from 'react'
import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import confetti from "canvas-confetti"
import { Square } from './assets/components/Square.jsx'
import './App.css'
import { TURNS, WINNER_COMBOS } from './constants.js'
import { checkWinner, checkEndGame } from './logic/board.js'
import { WinnerModal } from './assets/components/WinnerModal.jsx'
import { saveGameToStorage, resetGameStorage } from './logic/storage/index.js'




function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState(() => {
    const winnerFromStorage = window.localStorage.getItem('winner')
    return winnerFromStorage ? JSON.parse(winnerFromStorage) : (null)
  })

  const [hideWinner, setHideWinner] = useState(false);


  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage();
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    const newWinner = checkWinner(newBoard);
    saveGameToStorage({
      board: newBoard,
      turn
    })
    window.localStorage.setItem('board', JSON.stringify(newBoard));
    window.localStorage.setItem('turn', newTurn);
    window.localStorage.setItem('winner', JSON.stringify(newWinner));
    if (newWinner) {
      setWinner(newWinner);
      confetti();
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  }

  let hasGameStarted = !(board.every((square) => square === null))

  useEffect(() => {
    console.log('winner: ' + winner)
  }, [winner])

  return (
    <main className="board">
      <h1>Tic tac Toe</h1>
      <section className="game">
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >{board[index]}
              </Square>
            )
          })
        }

        {
          winner !== null && hideWinner === true && (
            <button className="toggle-winner-panel" onClick={() => setHideWinner(!hideWinner)}>x</button>
          )
        }


        {
          winner === null && hasGameStarted && (
            <button className="toggle-winner-panel" onClick={() => resetGame()}>R</button>
          )
        }

      </section>

      {winner === null && (
        <section className="turn">
          <Square isSelected={turn === TURNS.X}>
            {TURNS.X}
          </Square>
          <Square isSelected={turn === TURNS.O}>
            {TURNS.O}
          </Square>
        </section>
      )}


      <WinnerModal winner={winner} resetGame={resetGame} hideWinner={hideWinner} setHideWinner={setHideWinner} />


    </main>
  )

}

export default App
