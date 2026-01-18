import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [randomNumber, setRandomNumber] = useState(0)
  const [userGuess, setUserGuess] = useState('')
  const [message, setMessage] = useState('Guess a number between 1 and 100')
  const [guessCount, setGuessCount] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)

  useEffect(() => {
    generateNewNumber()
  }, [])

  const generateNewNumber = () => {
    const number = Math.floor(Math.random() * 100) + 1
    setRandomNumber(number)
    setMessage('Guess a number between 1 and 100')
    setGuessCount(0)
    setGameOver(false)
    setUserGuess('')
    setShowAnswer(false)
  }

  const handleGuess = () => {
    const guess = parseInt(userGuess)
    if (isNaN(guess) || guess < 1 || guess > 100) {
      setMessage('Please enter a valid number between 1 and 100')
      return
    }
    setGuessCount(guessCount + 1)
    if (guess === randomNumber) {
      setMessage(`Correct! You guessed it in ${guessCount + 1} tries.`)
      setGameOver(true)
      setShowAnswer(true)
    } else if (guess < randomNumber) {
      setMessage('Too low! Try again.')
    } else {
      setMessage('Too high! Try again.')
    }
    setUserGuess('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleGuess()
    }
  }

  const toggleShowAnswer = () => {
    setShowAnswer(!showAnswer)
  }

  return (
    <div className="app-container">
      <h1 className="title">Number Guessing Game</h1>
      <div className="game-card">
        <p className="message">{message}</p>
        {!gameOver && (
          <div className="input-section">
            <input
              type="number"
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your guess (1-100)"
              min="1"
              max="100"
              className="guess-input"
            />
            <button onClick={handleGuess} className="guess-button">Guess</button>
          </div>
        )}
        <div className="stats">
          <p className="guess-count">Guesses: {guessCount}</p>
          {gameOver && (
            <div className="answer-section">
              <button onClick={toggleShowAnswer} className="show-answer-button">
                {showAnswer ? 'Hide Answer' : 'Show Answer'}
              </button>
              {showAnswer && <p className="answer">The number was: {randomNumber}</p>}
            </div>
          )}
        </div>
        <button onClick={generateNewNumber} className="new-game-button">New Game</button>
      </div>
    </div>
  )
}

export default App
