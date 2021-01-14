import * as d3 from 'd3';
import React, { useRef, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const BarChart = () => {
    const { wordData } = useContext(AppContext);

    const ref = useRef();

    useEffect(() => {
        const svg = d3.select(ref.current)
            .attr('width', 500)
            .attr('height', 300)
    }, [wordData])

    useEffect(() => {
        draw(wordData);
    }, [wordData])


    const draw = (data) => {
        const svg = d3.select(ref.current);

        const margin = {
            top: 20,
            right: 20,
            bottom: 80,
            left: 80
          }
      
          const w = 500 - margin.right - margin.left;
          const h = 300 - margin.top - margin.bottom;
      
          let g = svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);
      
          // scales
          let xScale = d3.scaleLinear()
            .domain([0, 50])
            .range([0, w]);
          let yScale = d3.scaleLinear()
            .domain([0, 300])
            .range([h, 0]);
      
          // axes
          let xAxis = d3.axisBottom(xScale)
            .tickValues([0, 10, 20, 30, 40, 50])
            .tickFormat(d => 1970 + d)
          g.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0, ${h})`)
            .call(xAxis);
      
          let yAxis = d3.axisLeft(yScale)
            .tickFormat(d => +d);
          g.append('g')
            .attr('class', 'y-axis')
            .call(yAxis);
      
          const rects = svg.selectAll('rect')
            .data(data);
      
          rects.enter().append('rect')
            .attr('x', d => {console.log('d', d)})
    }

    return(
        <div className='chart'>
            <svg ref={ref}>
            </svg>
        </div>
    )
}

export default BarChart;