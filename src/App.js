import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Stack from './components/Stack';
import Queue from './components/Queue';
import LinkedList from './components/LinkedList';
import Home from './components/Home';
import './App.css';
import Graph from './components/Graph';
import Tree from './components/Tree';
import SortingVisualizer from './components/SortingVisualizer';

const App = () => {
  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand" to="/">Data Structure Visualizer</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/stack">Stack</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/queue">Queue</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/linkedlist">Linked List</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/graph">Graph</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/tree">Tree</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/sortingvisualizer">Sorting</Link>
                </li>
                
              </ul>
            </div>
          </div>
        </nav>
        
        {/* Route for each component */}
        <div className="container my-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stack" element={<Stack />} />
            <Route path="/queue" element={<Queue />} />
            <Route path="/linkedlist" element={<LinkedList />} />
            <Route path="/graph" element={<Graph />} />
            <Route path="/tree" element={<Tree />} />
            <Route path="/sortingvisualizer" element={<SortingVisualizer />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
