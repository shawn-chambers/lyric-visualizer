import React, { useContext } from 'react';
import * as d3 from 'd3';
import { AppContext } from '../context/AppContext';
import { useD3 } from '../hooks/useD3';
import { reduceSongsByYear, leastSquares, makeYears } from "../utils";


const D3Chart = () => {
  const { wordData, setSongs, setLyrics } = useContext(AppContext);

  const handleBarChartClick = (e) => {
    let year = Number(e.target.__data__.year);
    let selected = wordData.filter((song) => {
      return song.year === year
    })
    setSongs(selected);
    setLyrics('');

  }

  let data = reduceSongsByYear(wordData);

  const ref = useD3(
    (svg) => {
      const height = 500;
      const width = 800;
      const margin = { top: 20, right: 30, bottom: 40, left: 40 };


      const x = d3
        .scaleBand()
        .domain(makeYears(1970, 2020))
        .range([1970, 2020])
        .rangeRound([margin.left, width - margin.right])
        .padding(0.1);

      const y1 = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.count)])
        .rangeRound([height - margin.bottom, margin.top]);

      const xAxis = (g) =>
        g.attr("transform", `translate(0,${height - margin.bottom})`)
          .style("font-size", "1.4rem")
          .call(
            d3
              .axisBottom(x)
              .tickValues(
                d3
                  .ticks(...d3.extent(x.domain()), width / 40)
              )
              .tickSizeOuter(0)
          )
          .selectAll('text')
          .attr("dx", "-2.3rem")
          .attr("dy", "0.4rem")
          .attr('transform', 'rotate(-65)')

      const y1Axis = (g) =>
        g
          .attr("transform", `translate(${margin.left}, 0)`)
          .style("color", "black")
          .style("font-size", "1.4rem")
          .call(d3.axisLeft(y1).ticks(null, "s"))
          .call((g) => g.select(".domain").remove())
          .call((g) =>
            g
              .append("text")
              .attr("x", - margin.left)
              .attr("y", 10)
              .attr("fill", "currentColor")
              .attr("text-anchor", "start")
              .text(data.y1)
          );

      svg.select(".x-axis").call(xAxis);
      svg.select(".y-axis").call(y1Axis);

      svg
        .select(".plot-area")
        .selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d.year))
        .attr("width", x.bandwidth())
        .attr("y", (d) => y1(d.count))
        .attr("height", (d) => y1(0) - y1(d.count));

      let rects = svg.selectAll('rect');

      rects
        .data(data)
        .enter().append('rect')
        .transition()
        .duration(800)
        .attr("y", (d) => y1(d.count))
        .attr("height", (d) => y1(0) - y1(d.count))

      if (wordData.length) {
        let tip = d3.select('body').append('div')
          .attr('class', 'tool-tip')
          .style('opacity', 0);

        tip.destroy = () => {
          tip.style('opacity', 0)
            .style('visibility', 'hidden')
          setTimeout(() => {
            tip.remove();
          }, 1000)
        }

        rects.on('mouseover', (e) => {
          tip.transition()
            .duration(200)
            .style('opacity', 1);
          tip.html(
            `year: ${e.target.__data__.year}
            songs: ${e.target.__data__.count}`
          )
            .style('left', e.pageX + 20 + 'px')
            .style('top', (e.pageY - 45) + 'px')
        });

        rects.on("mouseout", (e) => {
          tip.transition()
            .duration(500)
            .style('opacity', 0);
        });

        rects.on("click", (e) => {
          handleBarChartClick(e);
          tip.destroy();
          // tip.remove();
        })

        const xLabels = makeYears(1970, 2020);
        var xSeries = d3.range(1, xLabels.length + 1);
        var ySeries = data.map((d) => d.count);

        var leastSquaresCoeff = leastSquares(xSeries, ySeries);

        var xA = xLabels[0];
        var yA = leastSquaresCoeff[0] + leastSquaresCoeff[1];
        var xB = xLabels[xLabels.length - 1];
        var yB = leastSquaresCoeff[0] * xSeries.length + leastSquaresCoeff[1];
        var trendData = [[xA, yA, xB, yB]];

        var trendline = svg.selectAll(".trendline")
          .data(trendData);

        trendline.enter()
          .append("line")
          .attr("class", "trendline")
          .attr("x1", (d) => x(d[0]) + 5)
          .attr("y1", (d) => y1(d[1]))
          .attr("x2", (d) => x(d[2]) + 5)
          .attr("y2", (d) => y1(d[3]))
          .attr("stroke", "black")
          .attr("stroke-width", 1);

        trendline
          .transition()
          .duration(1000)
          .attr("x1", (d) => x(d[0]) + 5)
          .attr("y1", (d) => y1(d[1]))
          .attr("x2", (d) => x(d[2]) + 5)
          .attr("y2", (d) => y1(d[3]))
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
          width: "100%",
          marginRight: "0px",
          marginLeft: "0px",
        }}
      >
        <g className="plot-area" />
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  )
}

export default D3Chart;