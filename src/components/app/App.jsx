import React, { useState, useEffect } from 'react';

const useRecord = (init) => {
  const [history, setHistory] = useState([init]);
  const [undoDisabled, setUndoDisabled] = useState(true);
  const [redoDisabled, setRedoDisabled] = useState(true);

  // const [current, setCurrent] = useState('');
  const [index, setIndex] = useState(0);

  const record = (color) => {
    setHistory((prevHistory) => [...prevHistory, color]);
    setIndex(history.length);
  };

  useEffect(() => {
    buttonControl();
  }, [index]);


  const undo = () => {
    setIndex((prevIndex) => prevIndex - 1);
  };
  const redo = () => {
    setIndex((prevIndex) => prevIndex + 1);
  };
  const current = history[index];

  const buttonControl = () => {
    if(index === 0) setUndoDisabled(true);
    else setUndoDisabled(false);
    if(index === history.length - 1) setRedoDisabled(true);
    else setRedoDisabled(false);
  };  


  return { current, undo, redo, record, undoDisabled, redoDisabled };
};

function App() {
  const { current, undo, redo, record, undoDisabled, redoDisabled } =
    useRecord('#FF0000');

  return (
    <>
      <button disabled={undoDisabled} onClick={undo}>undo</button>
      <button disabled={redoDisabled} onClick={redo}>redo</button>
      <label htmlFor="color-picker">Pick a Color</label>
      <input
        type="color"
        value={current}
        onChange={({ target }) => record(target.value)}
        id="color-picker"
      />
      <div data-testid="color-div"
        style={{ backgroundColor: current, width: '10rem', height: '10rem' }}
      ></div>
    </>
  );
}

export default App;
