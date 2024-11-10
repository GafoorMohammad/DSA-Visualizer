import React, { useState } from 'react';
import './Queue.css';

const Queue = () => {
  const [queue, setQueue] = useState([]);
  const [value, setValue] = useState('');
  const [queueType, setQueueType] = useState('Regular');
  const [priority, setPriority] = useState(1); // For priority queue

  // Array of colors for new queue elements
  const colors = ['#ff9a9e', '#fad0c4', '#fbc2eb', '#a6c1ee', '#84fab0', '#fccb90'];
  
  const maxSize = 5; // For circular queue size

  // Function to enqueue value
  const enqueue = (position = 'end') => {
    if (value) {
      const newQueueItem = {
        value, 
        color: colors[Math.floor(Math.random() * colors.length)], 
        priority: parseInt(priority, 10)
      };

      if (queueType === 'Regular' || queueType === 'Circular') {
        if (queueType === 'Circular' && queue.length >= maxSize) {
          // Circular Queue: replace first element if full
          const newQueue = [...queue];
          newQueue[0] = newQueueItem;
          setQueue(newQueue);
        } else {
          setQueue([...queue, newQueueItem]);
        }
      } else if (queueType === 'Priority') {
        // Priority Queue
        const newQueue = [...queue, newQueueItem];
        newQueue.sort((a, b) => b.priority - a.priority); // Sort by priority (highest first)
        setQueue(newQueue);
      } else if (queueType === 'Deque') {
        // Double-Ended Queue (Deque)
        if (position === 'front') {
          setQueue([newQueueItem, ...queue]);
        } else {
          setQueue([...queue, newQueueItem]);
        }
      }

      setValue('');
    }
  };

  // Function to dequeue value
  const dequeue = (position = 'front') => {
    const newQueue = [...queue];
    if (queueType === 'Deque' && position === 'back') {
      newQueue.pop(); // Remove from the back for Deque
    } else {
      newQueue.shift(); // Removes the front element for all other types
    }
    setQueue(newQueue);
  };

  return (
    <div className="queue-container">
      <h2 className="text-center mb-4">Interactive Queue Model</h2>

      {/* Dropdown for selecting queue type */}
      <div className="mb-3">
        <label htmlFor="queueType" className="form-label">Select Queue Type:</label>
        <select 
          id="queueType" 
          className="form-select" 
          value={queueType} 
          onChange={(e) => setQueueType(e.target.value)}
        >
          <option value="Regular">Regular Queue</option>
          <option value="Circular">Circular Queue</option>
          <option value="Priority">Priority Queue</option>
          <option value="Deque">Double-Ended Queue (Deque)</option>
        </select>
      </div>

      <div className="input-group mb-3">
        <input 
          type="text" 
          className="form-control" 
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
          placeholder="Enter value" 
        />
        {queueType === 'Priority' && (
          <input 
            type="number" 
            className="form-control" 
            value={priority} 
            onChange={(e) => setPriority(e.target.value)} 
            placeholder="Priority" 
            min="1" 
          />
        )}
        {queueType === 'Deque' && (
          <>
            <button className="btn btn-primary me-2" onClick={() => enqueue('front')}>Enqueue Front</button>
            <button className="btn btn-primary" onClick={() => enqueue('end')}>Enqueue Back</button>
          </>
        )}
        {queueType !== 'Deque' && (
          <button className="btn btn-primary" onClick={() => enqueue('end')}>Enqueue</button>
        )}
        <button className="btn btn-danger ms-2" onClick={() => dequeue('front')}>Dequeue</button>
        {queueType === 'Deque' && (
          <button className="btn btn-danger ms-2" onClick={() => dequeue('back')}>Dequeue Back</button>
        )}
      </div>

      <div className="queue">
        <h3>Queue ({queueType}):</h3>
        <div className="queue-items">
          {queue.map((item, index) => (
            <div 
              key={index} 
              className="queue-item" 
              style={{ backgroundColor: item.color }}>
              {item.value} {queueType === 'Priority' && <span>(P: {item.priority})</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Queue;
