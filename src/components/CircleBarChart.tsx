import React from 'react';
import * as d3 from 'd3';

import { useAppContext } from '../context/AppContext';
import { useD3 } from '../hooks/useD3';
import { colorArray } from '../utils';

const CircleBarChart: React.FC = () => {
  const { wordsByYear } = useAppContext();

  const size = 280;
  const radius = size / 2;

  const data = wordsByYear.filter((_el, i) => i < 10);
  const total = data.reduce((sum, d) => sum + d.nentry, 0);

  const ref = useD3(
    (svg) => {
      svg.selectAll('*').remove();

      if (!wordsByYear.length) return;

      const pie = d3
        .pie<(typeof data)[0]>()
        .value((d) => d.nentry)
        .sort(null);

      const arc = d3
        .arc<d3.PieArcDatum<(typeof data)[0]>>()
        .innerRadius(0)
        .outerRadius(radius - 10);

      const g = svg
        .attr('viewBox', `0 0 ${size} ${size}`)
        .append('g')
        .attr('transform', `translate(${size / 2}, ${size / 2})`);

      const tip = d3
        .select('body')
        .append('div')
        .attr('class', 'pop_up')
        .style('display', 'none')
        .style('position', 'absolute')
        .style('opacity', 0);

      const slices = g
        .selectAll('.slice')
        .data(pie(data))
        .join('path')
        .attr('class', 'slice')
        .style('fill', (_d, i) => colorArray[i] ?? colorArray[colorArray.length - 1])
        .style('opacity', 0);

      slices
        .on('mousemove', (event: MouseEvent, d) => {
          tip
            .style('display', 'inline-block')
            .style('opacity', 1)
            .style('left', event.pageX + 10 + 'px')
            .style('top', event.pageY - 25 + 'px')
            .html(`${d.data.word}: ${d.data.nentry}`);
        })
        .on('mouseout', () => {
          tip.style('opacity', 0).style('display', 'none');
        });

      slices
        .transition()
        .duration(600)
        .delay((_d, i) => i * 60)
        .attrTween('d', function (d) {
          const interpolate = d3.interpolate({ startAngle: d.startAngle, endAngle: d.startAngle }, d);
          return (t) => arc(interpolate(t)) ?? '';
        })
        .style('opacity', 1);
    },
    [wordsByYear]
  );

  return (
    <div className="circle-chart">
      <svg ref={ref} viewBox={`0 0 ${size} ${size}`} />
      {data.length > 0 && (
        <div className="circle-chart__legend">
          {data.map((d, i) => (
            <div key={d.word} className="circle-chart__legend-item">
              <span
                className="circle-chart__legend-swatch"
                style={{ background: colorArray[i] ?? colorArray[colorArray.length - 1] }}
              />
              <span className="circle-chart__legend-word">{d.word}</span>
              <span className="circle-chart__legend-pct">
                ({total > 0 ? Math.round((d.nentry / total) * 100) : 0}%)
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CircleBarChart;
