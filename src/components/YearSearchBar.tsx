import React, { useEffect, useState, useRef, MouseEvent } from 'react';

import { useAppContext } from '../context/AppContext';
import useDimension from '../hooks/useDimension';
import { makeYears } from '../utils';

const YearSearchBar: React.FC = () => {
  const { fetchWordsByYear, year, setYear } = useAppContext();
  const [selected, setSelected] = useState<string>('');

  const handleSelected = (e: MouseEvent<HTMLDivElement>): void => {
    if (selected.length === 0) {
      setSelected('selected');
    } else {
      setSelected('');
    }
    const target = e.target as HTMLDivElement;
    if (target.innerText !== 'Select a Year...' && Number(target.innerText) !== year) {
      setYear(Number(target.innerText));
    }
  };

  useEffect(() => {
    if (typeof year === 'number') {
      fetchWordsByYear(year);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year]);

  const handleDisplay = (selected: string): React.CSSProperties => {
    if (selected.length) {
      return {
        maxHeight: '150px',
        height: '150px',
        padding: '1rem',
      };
    } else {
      return {
        maxHeight: '0px',
        height: height,
      };
    }
  };

  const dropDownRef = useRef<HTMLUListElement>(null);
  const { height } = useDimension(dropDownRef);

  return (
    <div className={`container ${selected}`}>
      <div className={'select'} onClick={handleSelected}>
        {year ? year : 'Select a Year...'}
      </div>
      <ul style={handleDisplay(selected)} ref={dropDownRef}>
        {makeYears(1970, 2025).map((yearItem) => {
          return (
            <li key={yearItem}>
              <div className="select__year" onClick={handleSelected}>
                {yearItem}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default YearSearchBar;
