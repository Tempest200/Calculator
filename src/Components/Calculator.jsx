import React, { useState, useEffect } from 'react';
import { evaluate } from 'mathjs';
import './Calculator.css';

const Calculator = () => {
  const [input, setInput] = useState('');

  const append = (value) => {
    setInput((prev) => prev + value);
  };

  const clear = () => setInput('');
  const backspace = () => setInput((prev) => prev.slice(0, -1));

  const calculate = () => {
    try {
      const result = evaluate(input); // mathjs handles BIDMAS
      setInput(result.toString());
    } catch {
      setInput('Error');
    }
  };

  const handleKey = (e) => {
    const { key } = e;
    if (!isNaN(key) || ['+', '-', '*', '/', '.', '(', ')', '^'].includes(key)) {
      append(key);
    } else if (key === 'Enter') {
      calculate();
    } else if (key === 'Backspace') {
      backspace();
    } else if (key === 'Escape') {
      clear();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className="calculator">
      <input type="text" value={input} placeholder="0" disabled />

      <div className="buttons">
        <button onClick={clear}>C</button>
        <button onClick={() => append('(')}>(</button>
        <button onClick={() => append(')')}>)</button>
        <button onClick={backspace}>⌫</button>

        <button onClick={() => append('7')}>7</button>
        <button onClick={() => append('8')}>8</button>
        <button onClick={() => append('9')}>9</button>
        <button onClick={() => append('/')}>÷</button>

        <button onClick={() => append('4')}>4</button>
        <button onClick={() => append('5')}>5</button>
        <button onClick={() => append('6')}>6</button>
        <button onClick={() => append('*')}>×</button>

        <button onClick={() => append('1')}>1</button>
        <button onClick={() => append('2')}>2</button>
        <button onClick={() => append('3')}>3</button>
        <button onClick={() => append('-')}>-</button>

        <button onClick={() => append('0')}>0</button>
        <button onClick={() => append('.')}>.</button>
        <button onClick={() => append('^')}>^</button>
        <button onClick={() => append('+')}>+</button>

        <button className="equals" onClick={calculate}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
