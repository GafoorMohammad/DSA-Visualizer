import React, { useState } from 'react';
import './LinkedList.css';

const LinkedList = () => {
  const [list, setList] = useState([]);
  const [value, setValue] = useState('');

  // Array of colors for new nodes
  const colors = ['#ff9a9e', '#fad0c4', '#fbc2eb', '#a6c1ee', '#84fab0', '#fccb90'];

  // Function to add a node at the end
  const addNode = () => {
    if (value) {
      const newNode = {
        value,
        color: colors[Math.floor(Math.random() * colors.length)],
        next: null,
      };
      setList([...list, newNode]);
      setValue('');
    }
  };

  // Function to remove a node from the start
  const removeNode = () => {
    if (list.length > 0) {
      const newList = [...list];
      newList.shift(); // Remove head
      setList(newList);
    }
  };

  return (
    <div className="linkedlist-container">
      <h2 className="text-center mb-4">Interactive Singly Linked List Model</h2>

      <div className="input-group mb-3">
        <input 
          type="text" 
          className="form-control" 
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
          placeholder="Enter value" 
        />
        <button className="btn btn-primary" onClick={addNode}>Add Node</button>
        <button className="btn btn-danger ms-2" onClick={removeNode}>Remove Node</button>
      </div>

      <div className="linked-list">
        <h3>Singly Linked List:</h3>
        <div className="list-items">
          {list.length > 0 && (
            <div className="head-node" style={{ backgroundColor: list[0].color }}>
              Head: {list[0].value}
            </div>
          )}
          {list.map((item, index) => (
            <div key={index} className="list-item-container">
              <div 
                className="list-item" 
                style={{ backgroundColor: item.color }}
              >
                {item.value}
              </div>
              {/* Render arrow between nodes */}
              {index < list.length - 1 && (
                <span className="arrow">→</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LinkedList;
