import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';

const YearSearchBar = () => {
  const { fetchWordsByYear, year, setYear } = useContext(AppContext);
  const [queryYear, setQueryYear] = useState(year);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setYear(queryYear);
    }
  }

  useEffect(() => {
    fetchWordsByYear(year);
  }, [year])

  return (
    <div className="search">
      <form>
        <input
          value={queryYear}
          onKeyDown={handleKeyPress}
          onChange={(e) => setQueryYear(e.target.value)}
          placeholder="Enter a Year..."
        >
        </input>
        <button onClick={(e) => { e.preventDefault(); setYear(queryYear) }}>Search</button>
      </form>
    </div>
  )
}

export default YearSearchBar;