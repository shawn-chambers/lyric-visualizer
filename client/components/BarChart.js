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
        draw(makeSongsByYear(wordData));
    }, [wordData])

    useEffect(() => {
        if (chartRef.current) {
            if (chart) chart.destroy();
            setChart(
                draw(makeSongsByYear(wordData))
            )
        }
    }, [chartRef, wordData, chart])

    const draw = (data) => {
        console.log('data', data);
        console.log('formatted data', makeYears(1970, 2020).map((year) => filterDataByYear(year, data)));

        const labels = makeYears(1970, 2020);
        let songData = {
            labels: labels,
            datasets: [{
                label: 'Song Data',
                data: makeYears(1970, 2020).map(year => filterDataByYear(year, data))
            }]
        }
        const myRef = chartRef.current.getContext('2d');
        new Chart(myRef, {
            type: 'bar',
            data: songData,
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        })
    }

    return (
        <div className='chart-container'>
            <canvas className='chart' ref={chartRef} />
        </div>
    )
}

export default BarChart;