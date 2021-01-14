import React from 'react';
import ReactDOM from 'react-dom';

import SearchBar from './components/SearchBar';
import BarChart from './components/BarChart';
import { AppContextProvidor } from './context/AppContext';

const App = () => {
  return (
    <>
      <AppContextProvidor>
        <SearchBar />
        <BarChart />
      </AppContextProvidor>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));