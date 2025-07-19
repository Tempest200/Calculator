import React, { useState, useEffect } from 'react';
import { evaluate } from 'mathjs'; // mathjs handles expressions with BIDMAS correctly
import './Calculator.css';

const Calculator = () => {
  const [input, setInput] = useState(''); // State to hold the current input string

  // Appends a value (digit or operator) to the input string
  const append = (value) => {
    setInput((prev) => prev + value);
  };

  // Clears the entire input
  const clear = () => setInput('');

  // Deletes the last character in the input
  const backspace = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  // Evaluates the input expression using mathjs
  const calculate = () => {
    try {
      const result = evaluate(input); // Safely evaluates math with proper precedence (BIDMAS)
      setInput(result.toString());
    } catch {
      setInput('Error'); // Show 'Error' for invalid expressions
    }
  };

  // Handles keyboard input
  const handleKey = (e) => {
    const { key } = e;

    // Allow digits, operators, brackets, decimal, and exponent
    if (!isNaN(key) || ['+', '-', '*', '/', '.', '(', ')', '^'].includes(key)) {
      append(key);
    } else if (key === 'Enter') {
      calculate(); // Run calculation on Enter key
    } else if (key === 'Backspace') {
      backspace(); // Remove last character
    } else if (key === 'Escape') {
      clear(); // Clear the input
    }
  };

  // Add event listener for key presses when component mounts
  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey); // Cleanup
  }, []);

  return (
    <div className="calculator">
      {/* Display the current input */}
      <input type="text" value={input} placeholder="0" disabled />

      {/* Calculator buttons */}
      <div className="buttons">
        {/* Top row: Clear, parentheses, backspace */}
        <button onClick={clear}>C</button>
        <button onClick={() => append('(')}>(</button>
        <button onClick={() => append(')')}>)</button>
        <button onClick={backspace}>⌫</button>

        {/* Number pad and operators */}
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
        <button onClick={() => append('^')}>^</button> {/* Exponent operator */}
        <button onClick={() => append('+')}>+</button>

        {/* Final row: Equals button */}
        <button className="equals" onClick={calculate}>=</button>
      </div>
    </div>
  );
};

export default Calculator;

