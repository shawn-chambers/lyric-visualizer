import React from 'react';
import * as d3 from 'd3';

import { useAppContext } from '../context/AppContext';
import { useD3 } from '../hooks/useD3';
import { reduceSongsByYear, leastSquares, makeYears } from '../utils';
import { YearCount } from '../../shared/types';

interface TipSelection extends d3.Selection<HTMLDivElement, unknown, HTMLElement, unknown> {
  destroy: () => void;
}

const D3Chart: React.FC = () => {
  const { wordData, setSongs, setLyrics } = useAppContext();

  const handleBarChartClick = (e: MouseEvent): void => {
    const target = e.target as SVGRectElement & { __data__: YearCount };
    const year = Number(target.__data__.year);
    const selected = wordData.filter((song) => {
      return song.year === year;
    });
    setSongs(selected);
    setLyrics('');
  };

  const data = reduceSongsByYear(wordData);

  const ref = useD3(
    (svg) => {
      const height = 500;
      const width = 800;
      const margin = { top: 20, right: 30, bottom: 40, left: 40 };

      const x = d3
        .scaleBand()
        .domain(makeYears(1970, 2025))
        .rangeRound([margin.left, width - margin.right])
        .padding(0.1);

      const y1 = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.count) || 0])
        .rangeRound([height - margin.bottom, margin.top]);

      const domainExtent = d3.extent(x.domain()) as [string, string];
      const tickVals = d3.ticks(Number(domainExtent[0]), Number(domainExtent[1]), width / 40).map(String);

      const xAxis = (g: d3.Selection<SVGGElement, unknown, null, undefined>) =>
        g
          .attr('transform', `translate(0,${height - margin.bottom})`)
          .style('font-size', '1.4rem')
          .call(
            d3
              .axisBottom(x)
              .tickValues(tickVals)
              .tickSizeOuter(0)
          )
          .selectAll('text')
          .attr('dx', '-23px')
          .attr('dy', '4px')
          .attr('transform', 'rotate(-65)');

      const y1Axis = (g: d3.Selection<SVGGElement, unknown, null, undefined>) =>
        g
          .attr('transform', `translate(${margin.left}, 0)`)
          .style('color', 'black')
          .style('font-size', '1.4rem')
          .call(d3.axisLeft(y1).ticks(null, 's'))
          .call((g) => g.select('.domain').remove())
          .call((g) =>
            g
              .append('text')
              .attr('x', -margin.left)
              .attr('y', 10)
              .attr('fill', 'currentColor')
              .attr('text-anchor', 'start')
          );

      svg.select<SVGGElement>('.x-axis').call(xAxis);
      svg.select<SVGGElement>('.y-axis').call(y1Axis);

      svg
        .select('.plot-area')
        .selectAll('.bar')
        .data(data)
        .join('rect')
        .attr('class', 'bar')
        .attr('x', (d) => x(d.year) || 0)
        .attr('width', x.bandwidth())
        .attr('y', (d) => y1(d.count))
        .attr('height', (d) => y1(0) - y1(d.count));

      const rects = svg.selectAll('rect');

      rects
        .data(data)
        .enter()
        .append('rect')
        .transition()
        .duration(800)
        .attr('y', (d) => y1(d.count))
        .attr('height', (d) => y1(0) - y1(d.count));

      if (wordData.length) {
        const tip = d3.select('body').append('div').attr('class', 'tool-tip').style('opacity', 0) as TipSelection;

        tip.destroy = () => {
          tip.style('opacity', 0).style('visibility', 'hidden');
          setTimeout(() => {
            tip.remove();
          }, 1000);
        };

        rects.on('mouseover', (e: MouseEvent) => {
          const target = e.target as SVGRectElement & { __data__: YearCount };
          tip.transition().duration(200).style('opacity', 1);
          tip
            .html(`year: ${target.__data__.year} songs: ${target.__data__.count}`)
            .style('left', e.pageX + 20 + 'px')
            .style('top', e.pageY - 45 + 'px');
        });

        rects.on('mouseout', () => {
          tip.transition().duration(500).style('opacity', 0);
        });

        rects.on('click', (e: MouseEvent) => {
          handleBarChartClick(e);
          tip.destroy();
        });

        const xLabels = makeYears(1970, 2025);
        const xSeries = d3.range(1, xLabels.length + 1);
        const ySeries = data.map((d) => d.count);

        const leastSquaresCoeff = leastSquares(xSeries, ySeries);

        const xA = xLabels[0];
        const yA = leastSquaresCoeff[0] + leastSquaresCoeff[1];
        const xB = xLabels[xLabels.length - 1];
        const yB = leastSquaresCoeff[0] * xSeries.length + leastSquaresCoeff[1];
        const trendData = [[xA, yA, xB, yB]];

        const trendline = svg.selectAll('.trendline').data(trendData);

        trendline
          .enter()
          .append('line')
          .attr('class', 'trendline')
          .attr('x1', (d) => (x(String(d[0])) || 0) + 5)
          .attr('y1', (d) => y1(d[1] as number))
          .attr('x2', (d) => (x(String(d[2])) || 0) + 5)
          .attr('y2', (d) => y1(d[3] as number))
          .attr('stroke', 'black')
          .attr('stroke-width', 1);

        trendline
          .transition()
          .duration(1000)
          .attr('x1', (d) => (x(String(d[0])) || 0) + 5)
          .attr('y1', (d) => y1(d[1] as number))
          .attr('x2', (d) => (x(String(d[2])) || 0) + 5)
          .attr('y2', (d) => y1(d[3] as number));
      }
    },
    [data, wordData]
  );

  return (
    <div className="chart-container">
      <svg
        ref={ref}
        style={{
          height: 500,
          width: '100%',
          marginRight: '0px',
          marginLeft: '0px',
        }}
      >
        <g className="plot-area" />
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
};

export default D3Chart;
