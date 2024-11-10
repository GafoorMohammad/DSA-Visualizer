import React, { useState, useEffect, useRef } from 'react';
import { DataSet, Network } from 'vis-network/standalone';
import 'vis-network/styles/vis-network.css';
import './Graph.css';

const Graph = () => {
    const [edges, setEdges] = useState(''); // Initialize edges state
    const [startNode, setStartNode] = useState(''); // Initialize start node state
    const [graphData, setGraphData] = useState({ nodes: new DataSet([]), edges: new DataSet([]) });
    const networkRef = useRef(null);
    const networkInstance = useRef(null);
    const adjacencyMatrix = useRef({}); // Ref to store adjacency matrix

    // Parse the edges input into nodes and edges
    const parseEdges = (input) => {
        const pairs = input.split(',').map(pair => pair.trim());
        const nodes = new Set();
        const edgesArray = [];

        pairs.forEach(pair => {
            const [edge, weight] = pair.split(':').map(part => part.trim());
            const [src, dest] = edge.includes('->') ? edge.split('->').map(node => node.trim()) : edge.split('-').map(node => node.trim());
            nodes.add(src);
            nodes.add(dest);
            edgesArray.push({ from: src, to: dest, label: weight });
        });

        return {
            nodes: Array.from(nodes).map(node => ({ id: node, label: node })),
            edges: edgesArray
        };
    };

    // Create the adjacency matrix from the graph data
    const createAdjacencyMatrix = (nodes, edgesArray) => {
        const matrix = {};
        nodes.forEach(node => {
            matrix[node.id] = {};
            nodes.forEach(innerNode => {
                matrix[node.id][innerNode.id] = 0; // Initialize with 0
            });
        });

        edgesArray.forEach(edge => {
            matrix[edge.from][edge.to] = edge.label ? parseInt(edge.label) : 1; // Set weight (default to 1 if no weight specified)
        });

        return matrix;
    };

    // Handle edge input submission
    const handleSubmit = () => {
        const { nodes, edges: edgesArray } = parseEdges(edges);
        
        // Check if nodes or edges are empty
        if (nodes.length === 0) {
            alert('No nodes found. Please enter valid edges.');
            return;
        }
        
        if (edgesArray.length === 0) {
            alert('No edges found. Please enter valid edges.');
            return;
        }

        adjacencyMatrix.current = createAdjacencyMatrix(nodes, edgesArray); // Create adjacency matrix
        setGraphData({ nodes: new DataSet(nodes), edges: new DataSet(edgesArray) });
    };

    // Create the network visualization
    useEffect(() => {
        if (networkRef.current) {
            networkInstance.current = new Network(networkRef.current, graphData, {});
        }
    }, [graphData]);

    // Execute BFS using adjacency matrix
    const bfs = (start) => {
        const visited = new Set();
        const queue = [start];
        const result = [];

        while (queue.length > 0) {
            const node = queue.shift();
            if (!visited.has(node)) {
                visited.add(node);
                result.push(node);
                for (const neighbor in adjacencyMatrix.current[node]) {
                    if (adjacencyMatrix.current[node][neighbor] > 0 && !visited.has(neighbor)) {
                        queue.push(neighbor);
                    }
                }
            }
        }
        return result;
    };

    // Execute DFS using adjacency matrix
    const dfs = (start) => {
        const visited = new Set();
        const result = [];

        const dfsHelper = (node) => {
            if (!visited.has(node)) {
                visited.add(node);
                result.push(node);
                for (const neighbor in adjacencyMatrix.current[node]) {
                    if (adjacencyMatrix.current[node][neighbor] > 0) {
                        dfsHelper(neighbor);
                    }
                }
            }
        };

        dfsHelper(start);
        return result;
    };

    const handleSearch = (searchType) => {
        if (graphData.nodes.length === 0) {
            alert('Please enter a valid graph first.');
            return;
        }

        // Check if the provided start node exists in the graph
        if (!graphData.nodes.get(startNode)) {
            alert(`Start node "${startNode}" is not valid. Please enter a valid node.`);
            return;
        }

        let result;
        if (searchType === 'bfs') {
            result = bfs(startNode);
        } else {
            result = dfs(startNode);
        }
        alert(`${searchType.toUpperCase()} Result: ${result.join(', ')}`);
    };

    return (
        <div className="graph-container">
            <h2 className="text-center mb-4">Graph Data Structure</h2>
            <textarea
                className="form-control"
                rows="5"
                placeholder="Enter edges (e.g. A-B:1, B-C:2, C-D:3)"
                value={edges}
                onChange={(e) => setEdges(e.target.value)}
            />
            <input
                type="text"
                className="form-control mb-2"
                placeholder="Enter start node (e.g. A)"
                value={startNode}
                onChange={(e) => setStartNode(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleSubmit}>Create Graph</button>
            <div className="search-buttons">
                <button className="btn btn-success" onClick={() => handleSearch('bfs')}>BFS</button>
                <button className="btn btn-warning" onClick={() => handleSearch('dfs')}>DFS</button>
            </div>

            <div className="graph-visualization">
                <h3>Graph Visualization:</h3>
                <div ref={networkRef} style={{ height: '500px', border: '1px solid lightgray' }}></div>
            </div>
        </div>
    );
};

export default Graph;
