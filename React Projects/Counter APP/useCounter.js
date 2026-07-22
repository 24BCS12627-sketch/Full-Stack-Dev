import { useState } from "react";

function useCounter() {
  const [count, setCount] = useState(10);

  const addButton = () => {
    setCount(count + 1);
  };

  const removeButton = () => {
    setCount(count - 1);
  };

  const resetButton = () => {
    setCount(0);
  };

  return {
    count,
    addButton,
    removeButton,
    resetButton,
  };
}

export default useCounter;
