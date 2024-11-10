import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './Tree.css';

const Tree = ({ data }) => {
    const svgRef = useRef();

    useEffect(() => {
        const width = 800;
        const height = 600;

        // Clear previous SVG
        d3.select(svgRef.current).selectAll("*").remove();

        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(40,0)');

        const treeLayout = d3.tree().size([height, width - 160]);

        // Check if data is valid
        if (!data || !data.name) {
            console.error('Invalid data structure', data);
            return;
        }

        // Convert flat data into a hierarchy
        const root = d3.hierarchy(data);
        treeLayout(root);

        // Draw links
        svg.selectAll('.link')
            .data(root.links())
            .enter()
            .append('path')
            .attr('class', 'link')
            .attr('d', d3.linkHorizontal()
                .x(d => d.y)
                .y(d => d.x))
            .attr('fill', 'none')
            .attr('stroke', '#ccc');

        // Draw nodes
        const node = svg.selectAll('.node')
            .data(root.descendants())
            .enter()
            .append('g')
            .attr('class', 'node')
            .attr('transform', d => `translate(${d.y}, ${d.x})`);

        node.append('circle')
            .attr('r', 10)
            .attr('fill', '#69b3a2');

        node.append('text')
            .attr('dy', '.35em')
            .attr('x', d => d.children ? -12 : 12)
            .style('text-anchor', d => d.children ? 'end' : 'start')
            .text(d => d.data.name);
    }, [data]);

    return <svg ref={svgRef}></svg>;
};

export default Tree;
