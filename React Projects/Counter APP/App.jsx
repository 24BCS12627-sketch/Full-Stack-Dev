import useCounter from "./useCounter";

function App() {
  const { count, addButton, removeButton, resetButton } = useCounter();

  return (
    <>
      <h1>Counter App</h1>

      <h2>{count}</h2>

      <button onClick={addButton}>+</button>

      <button onClick={removeButton}>-</button>

      <button onClick={resetButton}>Reset</button>
    </>
  );
}

export default App;
