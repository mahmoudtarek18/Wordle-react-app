import React, { useContext, useCallback, useEffect } from 'react'
import Key from './Key';
import { appContext } from './../App';

function Keyboard() {
  const { onSelectLetter, onDelete, onEnter } = useContext(appContext);
  
  const key1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const key2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const key3 = ["Z", "x", "C", "v", "B", "N", "M"];

  const handleKeyboard = useCallback((event) => {
    console.log('event.key',event.key)
    if (event.key === 'Enter') {
      onEnter();
    } else if (event.key === 'Backspace') {
      onDelete();
    } else {
      key1.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key)
        }
      });
      key2.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key)
        }
      });
      key3.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key)
        }
      });
    }
  })

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboard);

    return () => {
      document.removeEventListener('keydown', handleKeyboard);
    }
  }, [handleKeyboard])

  return (
    <div className="keyboard" >
      <div className="line1">
        {key1.map(key => {
          return <Key keyVal={key}/>;
        })}
      </div>
      <div className="line2">
        {
          key2.map(key => {
            return <Key keyVal={key}/>;
          })
        }
      </div>
      <div className="line3">
        <Key keyVal={'ENTER'} bigKey/>
        {
          key3.map(key => {
            return <Key keyVal={key}/>;
          })
        }
        <Key keyVal={'DELETE'} bigKey/>
      </div>
    </div>
  )
}

export default Keyboard