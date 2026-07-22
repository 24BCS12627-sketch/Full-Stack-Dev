import { useState } from "react";

function App() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [result, setResult] = useState("");

  const convertCurrency = async () => {
    try {
      const response = await fetch(
        `https://open.er-api.com/v6/latest/${from}`
      );

      const data = await response.json();

      const rate = data.rates[to];

      setResult((amount * rate).toFixed(2));
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  return (
    <>
      <h1>Currency Converter</h1>

      <input
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <br /><br />

      <select value={from} onChange={(e) => setFrom(e.target.value)}>
        <option value="USD">USD</option>
        <option value="INR">INR</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
      </select>

      <span> ➜ </span>

      <select value={to} onChange={(e) => setTo(e.target.value)}>
        <option value="USD">USD</option>
        <option value="INR">INR</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
      </select>

      <br /><br />

      <button onClick={convertCurrency}>
        Convert
      </button>

      <h2>Result: {result}</h2>
    </>
  );
}

export default App;
