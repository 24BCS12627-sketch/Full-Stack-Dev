import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [running]);

  return (
    <>
      <h1>Stopwatch</h1>

      <h2>{time} sec</h2>

      <button onClick={() => setRunning(true)}>Start</button>

      <button onClick={() => setRunning(false)}>Stop</button>

      <button
        onClick={() => {
          setRunning(false);
          setTime(0);
        }}
      >
        Reset
      </button>
    </>
  );
}

export default App;
