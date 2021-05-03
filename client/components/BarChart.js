import React, { useRef, useEffect, useContext, useState } from 'react';
import Chart from "chart.js";
import { AppContext } from '../context/AppContext';

const makeYears = (start, end) => {
    let years = [];
    for (var i = start; i <= end; i++) {
        years.push(`${i}`);
    }
    return years
}

const filterDataByYear = (year, data) => {
    let thisData = 0;
    for (let j = 0; j < data.length; j++) {
        if (data[j].year === year) {
            thisData = data[j].count
            break;
        }
    }
    return thisData
}

const BarChart = () => {
    const { wordData, makeSongsByYear } = useContext(AppContext);
    const chartRef = useRef(null);
    const [chart, setChart] = useState();

    useEffect(() => {
        if (chartRef.current) {
            if (chart) chart.destroy()
            setChart(
                new Chart(chartRef.current.getContext('2d'), {
                    type: 'bar',
                    data: {
                        labels: makeYears(1970, 2020),
                        datasets: [{
                            label: 'Song Data',
                            data: makeYears(1970, 2020).map(year => filterDataByYear(year, makeSongsByYear(wordData)))
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                })
            )
        }
    }, [chartRef, wordData])

    return (
        <div className='chart-container' >
            <canvas className='chart' ref={chartRef} />
        </div>
    )
}

export default BarChart;