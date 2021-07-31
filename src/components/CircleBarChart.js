import React, { useContext } from 'react';
import * as d3 from 'd3';
import { AppContext } from '../context/AppContext';
import { useD3 } from '../hooks/useD3';
import { colorArray } from '../utils';

const CircleBarChart = () => {
  const { wordsByYear } = useContext(AppContext);

  const width = 600,
    height = 500,
    chartRadius = height / 2 - 40;

  let data = wordsByYear.filter((el, i) => {
    if (i < 10) return el;
  })

  const ref = useD3(
    (svg) => {

      if (wordsByYear.length) {
        const color = d3.scaleOrdinal().domain(data)
          .range(colorArray);

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

        const numArcs = keys.length;
        const arcWidth = (chartRadius - arcMinRadius - numArcs * arcPadding) / numArcs;

        let arc = d3.arc()
          .innerRadius((d, i) => getInnerRadius(i))
          .outerRadius((d, i) => getOuterRadius(i))
          .startAngle(0)
          .endAngle((d, i) => scale(d))


        const arialAxis = (g) => {
          g.selectAll('*').remove();

          let group = g
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
            .selectAll('g')
            .data(ticks)
            .join('g')
            .attr('transform', d => 'rotate(' + (rad2deg(scale(d)) - 90) + ')')
          group.append('line')
            .attr('x2', chartRadius);
          group.append('text')
            .attr('x', chartRadius + 10)
            .style('text-anchor', d => (scale(d) >= PI && scale(d) < 2 * PI ? 'end' : null))
            .attr('transform', d => 'rotate(' + (90 - rad2deg(scale(d))) + ',' + (chartRadius + 10) + ',0) translate(0, 5)')
            .text(d => d);

          return group;
        }

        svg.select('.a-axis').call(arialAxis);

        const radialAxis = (g) =>
          g
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
            .call(g =>
              g
                .append('circle')
                .attr('r', (d, i) => getOuterRadius(i) + arcPadding)
            )
            .call(g =>
              g
                .selectAll('text')
                .data(data)
                .join('text')
                .attr('x', labelPadding)
                .attr('y', (d, i) => -getOuterRadius(i) + arcPadding)
                .style('text-anchor', 'end')
                .style('font-family', "'Roboto', sans-serif")
                .style('font-size', '14px')
                .text(d => d.word)
            )

        svg.select('.r-axis').call(radialAxis);

        svg
          .select('.data')
          .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
          .selectAll('path')
          .data(data)
          .join('path')
          .attr('class', 'arc')
          .style('fill', (d, i) => color(i))
          .transition()
          .delay((d, i) => i * 200)
          .duration(1000)
          .attrTween('d', arcTween)

        let arcs = svg.selectAll('.arc');

        let popUp = d3.select('body').append('div').attr('class', 'pop_up').style('display', 'none');
        
        function showTooltip(event, d) {
          popUp.style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 25) + 'px')
            .style('display', 'inline-block')
            .style('position', 'absolute')
            .style('opacity', 1)
            .html(d.nentry);
        }

        function hideTooltip() {
          popUp.style('opacity', 0);
        }

        arcs.on('mousemove', (e, d) => showTooltip(e, d))
        arcs.on('mouseout', hideTooltip)


        function arcTween(d, i) {
          let interpolate = d3.interpolate(0, d.nentry);
          return t => arc(interpolate(t), i);
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
      <svg
        ref={ref}
        style={{
          width,
          height
        }}
      >
        <g className="data" />
        <g className="a-axis axis" />
        <g className="r-axis axis" />
      </svg>
    </div>
  )
}

export default CircleBarChart;