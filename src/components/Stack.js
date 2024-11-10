import React, { useState } from 'react';
import './Stack.css';

const Stack = () => {
  const [stack, setStack] = useState([]);
  const [value, setValue] = useState('');
  const [type, setType] = useState('Integer'); // State for selected type

  // Array of colors for new stack elements
  const colors = ['#ff9a9e', '#fad0c4', '#fbc2eb', '#a6c1ee', '#84fab0', '#fccb90'];

  // Function to check if the value matches the selected type
  const isValidValue = (val) => {
    switch (type) {
      case 'Integer':
        return !isNaN(val) && Number.isInteger(Number(val));
      case 'String':
        return typeof val === 'string' && val.trim() !== '';
      case 'Character':
        return typeof val === 'string' && val.length === 1;
      default:
        return false;
    }
  };

  // Function to push value onto stack (add to the top)
  const push = () => {
    if (value && isValidValue(value)) {
      const newValue = type === 'Integer' ? Number(value) :
                       type === 'Character' ? value.charAt(0) :
                       value; // for String

      const newStack = [
        { value: newValue, color: colors[Math.floor(Math.random() * colors.length)] },
        ...stack
      ];
      setStack(newStack);
      setValue('');
    } else {
      alert(`Invalid value for ${type}. Please enter a valid ${type}.`);
    }
  };

  // Function to pop value from stack (remove from the top)
  const pop = () => {
    const newStack = [...stack];
    newStack.shift(); // Removes the topmost element (first element)
    setStack(newStack);
  };

  return (
    <div className="stack-container">
      <h2 className="text-center mb-4">Interactive Stack Model</h2>
      <div className="input-group mb-3">
        <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Integer">Integer</option>
          <option value="String">String</option>
          <option value="Character">Character</option>
        </select>
        <input 
          type="text" 
          className="form-control" 
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
          placeholder={`Enter a ${type}`} 
        />
        <button className="btn btn-primary" onClick={push}>Push</button>
        <button className="btn btn-danger ms-2" onClick={pop}>Pop</button>
      </div>
      <div className="stack">
        <h3>Stack:</h3>
        <ul className="list-group">
          {stack.map((item, index) => (
            <li 
              key={index} 
              className="list-group-item" 
              style={{ backgroundColor: item.color }}>
              {item.value.toString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Stack;
