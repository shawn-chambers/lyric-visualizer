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
    if (i < 10) return el;
  })

  const ref = useD3(
    (svg) => {

      if (wordsByYear.length) {
        // const color = d3.scaleOrdinal(d3.schemeCategory10);
        const color = d3.scaleOrdinal().domain(data)
        .range(["#011e21", "#02363c", "#044b52", "#0c626b", "#157680", "#24919c", "#36aebb", "#48c3d0", "#62bac3", "#8aebf5", "#b6f8ff"]);

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
                .style('z-index', '5')
                .text(d => d.word)
            )

        svg.select('.r-axis').call(radialAxis);

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
            .attr('transform', d => 'rotate(' + (90 - rad2deg(scale(d))) + ',' + (chartRadius + 10) + ',0)')
            .text(d => d);

          return group;
        }

        svg.select('.a-axis').call(arialAxis);

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

        // const arcs = (g) => {
        //   g.selectAll('*').remove();
        //   let group = g
        //     .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
        //     .call(g =>
        //       g
        //         // .append('path')
        //         .selectAll('path')
        //         .data(data)
        //         .enter().insert('path')
        //         .attr('class', 'arc')
        //         .style('fill', (d, i) => color(i))
        //         .transition()
        //         .delay((d, i) => i * 200)
        //         .duration(1000)
        //         .attrTween('d', arcTween)
        //     )

        //   return group;
        // }




        // svg.select('.data').call(arcs);


        //data arcs
        // let arcs = svg.append('g')
        //   .attr('class', 'data')
        //   .selectAll('path')
        //   .data(data)
        //   .enter().append('path')
        //   .attr('class', 'arc')
        //   .style('fill', (d, i) => color(i))

        // arcs.transition()
        //   .delay((d, i) => i * 200)
        //   .duration(1000)
        //   .attrTween('d', arcTween);


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
      {/* {console.log('data for chart -->', data)} */}
      <svg
        ref={ref}
        style={{
          width,
          height
        }}
      >
        <g className="data" />
        <g className="r-axis axis" />
        <g className="a-axis axis" />
      </svg>
    </div>
  )
}

export default CircleBarChart;