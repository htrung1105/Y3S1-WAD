import React, { useState } from 'react';
import '../App.css';

const SumCalculator = () => {
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [sum, setSum] = useState('');
  const [error, setError] = useState('');

  const handleCalculate = () => {
    if (number1 === '' || number2 === '') {
      setError('Please enter both numbers.');
      setSum('');
      return;
    }

    const num1 = parseFloat(number1);
    const num2 = parseFloat(number2);

    if (isNaN(num1) || isNaN(num2)) {
      setError('Please enter valid numbers.');
      setSum('');
      return;
    }

    setSum(num1 + num2);
    setError('');
  };

  return (
    <div className="sum-calculator">
      <h1>Sum Calculator</h1>
      <div className="input-group">
        <input
          type="number"
          value={number1}
          onChange={(e) => setNumber1(e.target.value)}
          placeholder="Number 1"
        />
        <input
          type="number"
          value={number2}
          onChange={(e) => setNumber2(e.target.value)}
          placeholder="Number 2"
        />
      </div>
      <button onClick={handleCalculate}>Calculate Sum</button>
      <div className="result">
        {sum !== '' && <h2>Result: {sum}</h2>}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default SumCalculator;
