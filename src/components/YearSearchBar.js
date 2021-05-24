import React, { useContext, useEffect, useState, useRef } from 'react';
import { AppContext } from '../context/AppContext';
import useDimension from '../hooks/useDimension';
import { makeYears } from '../utils';


const YearSearchBar = () => {
  const { fetchWordsByYear, year, setYear } = useContext(AppContext);
  const [selected, setSelected] = useState('');

  const handleSelected = (e) => {
    if (selected.length === 0) {
      setSelected('selected');
    } else {
      setSelected('');
    }
    if (e.target.innerText !== 'Select a Year...') {
      setYear(Number(e.target.innerText))
    }
  }

  useEffect(() => {
    fetchWordsByYear(year)
  }, [year])

  const handleDisplay = (selected) => {
    if (selected.length) {
      return {
        maxHeight: '150px',
        height: '150px',
        padding: '1rem',
      }
    } else {
      return {
        maxHeight: '0px',
        height: height,
      }
    }
  }

  const dropDownRef = useRef(null);
  const { height } = useDimension(dropDownRef)

  return (
    <div className={`container ${selected}`}>
      <div className={`select`} onChange={(e) => setQueryYear(e.target.value)}
        onClick={handleSelected}>
        Select a Year...</div>
      <ul style={handleDisplay(selected)} ref={dropDownRef}>
        {makeYears(1970, 2020).map(year => {
          return (
            <li key={year}>
              <div className='select__year' onClick={(e) => handleSelected(e)} value={year}>{year}</div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default YearSearchBar;