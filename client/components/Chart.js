// import React, { useContext, useEffect } from 'react';
import * as d3 from 'd3';
import 'd3-selection-multi';

class Chart {
  constructor(element, wordData) {
    const margin = {
      top: 20,
      right: 20,
      bottom: 80,
      left: 80
    }

    const w = 900 - margin.right - margin.left;
    const h = 700 - margin.top - margin.bottom;

    let svg = d3.select(element).append('svg')
      .attr('height', 700)
      .attr('width', 900)
      .attr('id', 'svg-chart');

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
      .data(wordData);

    rects.enter().append('rect')
      .attr('x', d => {console.log('d', d)})

  }
}

export default Chart;