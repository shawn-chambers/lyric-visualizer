import React, { useContext } from 'react';
import * as d3 from 'd3';
import { AppContext } from '../context/AppContext';
import { useD3 } from '../hooks/useD3';

const CircleBarChart = () => {
  const { wordsByYear } = useContext(AppContext);

  const width = 960,
    height = 500,
    chartRadius = height / 2 - 40;

  let data = wordsByYear.filter((el, i) => {
    if (i < 5) return el;
  })

  const ref = useD3(
    (svg) => {

      if (wordsByYear.length) {
        const color = d3.scaleOrdinal(d3.schemeCategory10);

        let g = svg
          .append('g')
          .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

        const PI = Math.PI,
          arcMinRadius = 10,
          arcPadding = 10,
          labelPadding = -5,
          numTicks = 10;

        let scale = d3.scaleLinear()
          .domain([0, d3.max(data, d => d.nentry) * 1.1])
          .range([0, 2 * PI]);

        let ticks = scale.ticks(numTicks).slice(0, -1);
        let keys = data.map((d, i) => d.word);
        //number of arcs
        const numArcs = keys.length;
        const arcWidth = (chartRadius - arcMinRadius - numArcs * arcPadding) / numArcs;

        let arc = d3.arc()
          .innerRadius((d, i) => getInnerRadius(i))
          .outerRadius((d, i) => getOuterRadius(i))
          .startAngle(0)
          .endAngle((d, i) => scale(d))


        let radialAxis = g.append('g')
          .attr('class', 'r-axis')
          .selectAll('g')
          .data(data)
          .enter().append('g');

        radialAxis.append('circle')
          .attr('r', (d, i) => getOuterRadius(i) + arcPadding);

        radialAxis.append('text')
          .attr('x', labelPadding)
          .attr('y', (d, i) => -getOuterRadius(i) + arcPadding)
          .text(d => d.word);

        let axialAxis = g.append('g')
          .attr('class', 'a-axis')
          .selectAll('g')
          .data(ticks)
          .enter().append('g')
          .attr('transform', d => 'rotate(' + (rad2deg(scale(d)) - 90) + ')');

        axialAxis.append('line')
          .attr('x2', chartRadius);

        axialAxis.append('text')
          .attr('x', chartRadius + 10)
          .style('text-anchor', d => (scale(d) >= PI && scale(d) < 2 * PI ? 'end' : null))
          .attr('transform', d => 'rotate(' + (90 - rad2deg(scale(d))) + ',' + (chartRadius + 10) + ',0)')
          .text(d => d);

        //data arcs
        let arcs = g.append('g')
          .attr('class', 'data')
          .selectAll('path')
          .data(data)
          .enter().append('path')
          .attr('class', 'arc')
          .style('fill', (d, i) => color(i))

        arcs.transition()
          .delay((d, i) => i * 200)
          .duration(1000)
          .attrTween('d', arcTween);

        // arcs.on('mousemove', showTooltip)
        // arcs.on('mouseout', hideTooltip)

        function arcTween(d, i) {
          let interpolate = d3.interpolate(0, d.nentry);
          console.log('interpolate', interpolate)
          return t => arc(interpolate(t), i);
        }

        function showTooltip(d) {
          tooltip.style('left', (d3.event.pageX + 10) + 'px')
            .style('top', (d3.event.pageY - 25) + 'px')
            .style('display', 'inline-block')
            .html(d.nentry);
        }

        function hideTooltip() {
          tooltip.style('display', 'none');
        }

        function rad2deg(angle) {
          return angle * 180 / PI;
        }

        function getInnerRadius(index) {
          return arcMinRadius + (numArcs - (index + 1)) * (arcWidth + arcPadding);
        }

        function getOuterRadius(index) {
          return getInnerRadius(index) + arcWidth;
        }
      }
    }, [wordsByYear]
  )

  return (
    <div className='circle-chart'>
      {console.log('data for chart -->', data)}
      <svg
        ref={ref}
        style={{
          width,
          height
        }}
      >
      </svg>
    </div>
  )
}

export default CircleBarChart;