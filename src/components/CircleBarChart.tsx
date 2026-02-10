import React from 'react';
import * as d3 from 'd3';

import { useAppContext } from '../context/AppContext';
import { useD3 } from '../hooks/useD3';
import { colorArray } from '../utils';
import { WordStats } from '../../shared/types';

const CircleBarChart: React.FC = () => {
  const { wordsByYear } = useAppContext();

  const width = 600,
    height = 500,
    chartRadius = height / 2 - 40;

  const data = wordsByYear.filter((_el, i) => i < 10);

  const ref = useD3(
    (svg) => {
      if (wordsByYear.length) {
        const color = d3.scaleOrdinal<number, string>().domain(d3.range(data.length)).range(colorArray);

        const PI = Math.PI,
          arcMinRadius = 10,
          arcPadding = 10,
          labelPadding = -5,
          numTicks = 10;

        const scale = d3
          .scaleLinear()
          .domain([0, (d3.max(data, (d) => d.nentry) || 0) * 1.1])
          .range([0, 2 * PI]);

        const ticks = scale.ticks(numTicks).slice(0, -1);

        const numArcs = data.length;
        const arcWidth = (chartRadius - arcMinRadius - numArcs * arcPadding) / numArcs;

        const getInnerRadius = (index: number): number => {
          return arcMinRadius + (numArcs - (index + 1)) * (arcWidth + arcPadding);
        };

        const getOuterRadius = (index: number): number => {
          return getInnerRadius(index) + arcWidth;
        };

        const rad2deg = (angle: number): number => {
          return (angle * 180) / PI;
        };

        const arc = d3
          .arc<number>()
          .innerRadius((_d, i) => getInnerRadius(i))
          .outerRadius((_d, i) => getOuterRadius(i))
          .startAngle(0)
          .endAngle((d) => scale(d));

        const arialAxis = (g: d3.Selection<SVGGElement, unknown, null, undefined>) => {
          g.selectAll('*').remove();

          const group = g
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
            .selectAll('g')
            .data(ticks)
            .join('g')
            .attr('transform', (d) => 'rotate(' + (rad2deg(scale(d)) - 90) + ')');
          group.append('line').attr('x2', chartRadius);
          group
            .append('text')
            .attr('x', chartRadius + 10)
            .style('text-anchor', (d) => (scale(d) >= PI && scale(d) < 2 * PI ? 'end' : null))
            .attr(
              'transform',
              (d) => 'rotate(' + (90 - rad2deg(scale(d))) + ',' + (chartRadius + 10) + ',0) translate(0, 5)'
            )
            .text((d) => d);

          return group;
        };

        svg.select<SVGGElement>('.a-axis').call(arialAxis);

        const radialAxis = (g: d3.Selection<SVGGElement, unknown, null, undefined>) =>
          g
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
            .call((g) => g.append('circle').attr('r', getOuterRadius(0) + arcPadding))
            .call((g) =>
              g
                .selectAll('text')
                .data(data)
                .join('text')
                .attr('x', labelPadding)
                .attr('y', (_d, i) => -getOuterRadius(i) + arcPadding)
                .style('text-anchor', 'end')
                .style('font-family', "'Roboto', sans-serif")
                .style('font-size', '14px')
                .text((d) => d.word)
            );

        svg.select<SVGGElement>('.r-axis').call(radialAxis);

        const arcTween = (d: WordStats, i: number) => {
          const interpolate = d3.interpolate(0, d.nentry);
          return (t: number) => arc(interpolate(t), i) || '';
        };

        svg
          .select('.data')
          .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
          .selectAll('path')
          .data(data)
          .join('path')
          .attr('class', 'arc')
          .style('fill', (_d, i) => color(i))
          .transition()
          .delay((_d, i) => i * 200)
          .duration(1000)
          .attrTween('d', arcTween);

        const arcs = svg.selectAll('.arc');

        const popUp = d3.select('body').append('div').attr('class', 'pop_up').style('display', 'none');

        function showTooltip(event: MouseEvent, d: WordStats) {
          popUp
            .style('left', event.pageX + 10 + 'px')
            .style('top', event.pageY - 25 + 'px')
            .style('display', 'inline-block')
            .style('position', 'absolute')
            .style('opacity', 1)
            .html(String(d.nentry));
        }

        function hideTooltip() {
          popUp.style('opacity', 0);
        }

        arcs.on('mousemove', (e: MouseEvent, d: unknown) => showTooltip(e, d as WordStats));
        arcs.on('mouseout', hideTooltip);
      }
    },
    [wordsByYear]
  );

  return (
    <div className="circle-chart">
      <svg
        ref={ref}
        style={{
          width,
          height,
        }}
      >
        <g className="data" />
        <g className="a-axis axis" />
        <g className="r-axis axis" />
      </svg>
    </div>
  );
};

export default CircleBarChart;
