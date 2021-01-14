import React, { useRef, useState, useEffect, useContext} from 'react';
import Chart from './Chart';
import { AppContext } from '../context/AppContext';

const ChartWrapper = () => {
  const chartArea = useRef(null);
  const [chart, setChart] = useState(null);
  const { wordData } = useContext(AppContext);

  useEffect(() => {
    if (!chart) {
      setChart(new Chart(chartArea.current, wordData));
    }
  }, [chart, wordData]);

  return (
    <div ref={chartArea}></div>
  )
}

export default ChartWrapper;