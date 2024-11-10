import React, { useState } from 'react';
import './SortingVisualizer.css';

const SortingVisualizer = () => {
  const colors = ['#ff9a9e', '#fad0c4', '#fbc2eb', '#a6c1ee', '#84fab0', '#fccb90'];

  const [array, setArray] = useState(generateRandomArray());
  const [algorithm, setAlgorithm] = useState('Bubble Sort');
  const [isSorting, setIsSorting] = useState(false);
  const [logs, setLogs] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [algorithmInfo, setAlgorithmInfo] = useState('');

  const algorithmDetails = {
    'Bubble Sort': {
      description: 'Bubble Sort repeatedly swaps adjacent elements if they are in the wrong order.',
      complexity: 'Time: O(n^2), Space: O(1)',
      code: `function bubbleSort(arr) {...}`,
    },
    'Selection Sort': {
      description: 'Selection Sort finds the minimum element from the unsorted part and swaps it with the first element.',
      complexity: 'Time: O(n^2), Space: O(1)',
      code: `function selectionSort(arr) {...}`,
    },
    'Insertion Sort': {
      description: 'Insertion Sort builds a sorted array one element at a time by inserting elements in their correct position.',
      complexity: 'Time: O(n^2), Space: O(1)',
      code: `function insertionSort(arr) {...}`,
    },
    'Merge Sort': {
      description: 'Merge Sort divides the array into halves, sorts each half, and merges the sorted halves.',
      complexity: 'Time: O(n log n), Space: O(n)',
      code: `function mergeSort(arr) {...}`,
    },
    'Quick Sort': {
      description: 'Quick Sort picks a pivot and partitions the array around it into elements less than and greater than the pivot.',
      complexity: 'Time: O(n log n), Space: O(log n)',
      code: `function quickSort(arr) {...}`,
    },
  };

  function generateRandomArray() {
    return Array.from({ length: 10 }, () => ({
      value: Math.floor(Math.random() * 100) + 1,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
  }

  const handleUserArray = () => {
    const userArray = userInput.split(',').map(num => ({
      value: parseInt(num.trim()),
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    setArray(userArray);
    setLogs([]);
  };

  const handleSort = async () => {
    setIsSorting(true);
    setLogs([]);
    setAlgorithmInfo(algorithmDetails[algorithm]);
    let sortedArray;

    switch (algorithm) {
      case 'Bubble Sort':
        sortedArray = await bubbleSort([...array]);
        break;
      case 'Selection Sort':
        sortedArray = await selectionSort([...array]);
        break;
      case 'Insertion Sort':
        sortedArray = await insertionSort([...array]);
        break;
      case 'Merge Sort':
        sortedArray = await mergeSort([...array]);
        break;
      case 'Quick Sort':
        sortedArray = await quickSort([...array], 0, array.length - 1);
        break;
      default:
        return;
    }

    setArray(sortedArray);
    setIsSorting(false);
  };

  const bubbleSort = async (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j].value > arr[j + 1].value) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          logStep(`Swapped ${arr[j].value} and ${arr[j + 1].value}`);
          setArray([...arr]);
          await delay();
        }
      }
    }
    return arr;
  };

  const selectionSort = async (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j].value < arr[minIdx].value) {
          minIdx = j;
        }
      }
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      logStep(`Swapped ${arr[i].value} and ${arr[minIdx].value}`);
      setArray([...arr]);
      await delay();
    }
    await delay();
    return arr;
  };

  const insertionSort = async (arr) => {
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j].value > key.value) {
        arr[j + 1] = arr[j];
        j--;
        setArray([...arr]);
        await delay();
      }
      arr[j + 1] = key;
      logStep(`Inserted ${key.value}`);
    }
    return arr;
  };

  const mergeSort = async (arr) => {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = await await mergeSort(arr.slice(0, mid));
    const right = await await mergeSort(arr.slice(mid));
    const merged = await await merge(left, right);
    setArray([...merged]);
    await delay();
    await delay();
    return merged;
  };

  const merge = async (left, right) => {
    let result = [], leftIndex = 0, rightIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex].value < right[rightIndex].value) {
        result.push(left[leftIndex++]);
      } else {
        result.push(right[rightIndex++]);
      }
      setArray([...result, ...left.slice(leftIndex), ...right.slice(rightIndex)]);
      await delay();
    }
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  };

  const quickSort = async (arr, low, high) => {
    if (low < high) {
      const pivotIdx = await partition(arr, low, high);
      await quickSort(arr, low, pivotIdx - 1);
      await quickSort(arr, pivotIdx + 1, high);
    }
    return arr;
  };

  const partition = async (arr, low, high) => {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (arr[j].value < pivot.value) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        await delay();
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    await delay();
    return i + 1;
  };

  const logStep = (message) => {
    setLogs((prevLogs) => [...prevLogs, message]);
  };

  const delay = () => new Promise((resolve) => setTimeout(resolve, 300));

  return (
    <div className="sorting-visualizer">
      <h2 className="text-center mb-4">Sorting Algorithms Visualizer</h2>
      <div className="controls">
        <select 
          className="form-select" 
          value={algorithm} 
          onChange={(e) => setAlgorithm(e.target.value)} 
          disabled={isSorting}
        >
          {Object.keys(algorithmDetails).map(algo => (
            <option key={algo} value={algo}>{algo}</option>
          ))}
        </select>
        <button 
          className="btn btn-primary ms-2" 
          onClick={handleSort} 
          disabled={isSorting}
        >
          Sort
        </button>
        <button 
          className="btn btn-danger ms-2" 
          onClick={() => setArray(generateRandomArray())} 
          disabled={isSorting}
        >
          Reset Array
        </button>
      </div>
      <div className="user-array-input">
        <input
          type="text"
          className="form-control"
          placeholder="Enter numbers separated by commas"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={isSorting}
        />
        <button className="btn btn-success ms-2" onClick={handleUserArray} disabled={isSorting}>
          Use Custom Array
        </button>
      </div>
      {algorithmInfo && (
        <div className="algorithm-info">
          <h3>{algorithm}</h3>
          <p>{algorithmInfo.description}</p>
          <p><strong>{algorithmInfo.complexity}</strong></p>
          <pre>{algorithmInfo.code}</pre>
        </div>
      )}
      <div className="array-container">
        {array.map((item, index) => (
          <div 
            key={index} 
            className="array-bar" 
            style={{
              height: `${item.value * 3}px`,
              backgroundColor: item.color
            }}
          >
            {item.value}
          </div>
        ))}
      </div>
      <div className="log-container">
        <p>{logs.join(' | ')}</p>
      </div>
    </div>
  );
};

export default SortingVisualizer;
