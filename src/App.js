import { createContext, useState, useEffect } from 'react';
import './App.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import { boardDefault, generateWordset } from './words';

export const appContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
  const [wordSet, setWordSet] = useState(new Set());

  const correctWord = 'RIGHT';

  useEffect(() => {
    generateWordset().then(words => {
      console.log(words.wordSet)
      setWordSet(words.wordSet);
    })
  }, [])

  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 4) return;
    console.log('currAttempt',currAttempt)
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrAttempt(prevCurrAttempt => {
      return {...prevCurrAttempt, letterPos :prevCurrAttempt.letterPos +1 }
    })
  }

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;
      const newBoard = [...board];
      newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
      setBoard(newBoard);
      setCurrAttempt(prevCurrAttempt => {
      return {...prevCurrAttempt, letterPos: prevCurrAttempt.letterPos -1 }
      })
  }

  const onEnter = () => {
     if (currAttempt.letterPos !== 5) return;
      setCurrAttempt(prevCurrAttempt => {
      return {...prevCurrAttempt, attempt :prevCurrAttempt.attempt +1, letterPos: 0 }
      })
  }

  
  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <appContext.Provider value={{board, setBoard, currAttempt, setCurrAttempt, onSelectLetter, onDelete, onEnter, correctWord}}>
        <div className="game">
          <Board />
          <Keyboard />
        </div>
      </appContext.Provider>
    </div>
  );
}

export default App;
