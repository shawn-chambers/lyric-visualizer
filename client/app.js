import React from 'react';
import ReactDOM from 'react-dom';

import SearchBar from './components/SearchBar';
import ChartWrapper from './components/ChartWrapper';
import { AppContextProvidor } from './context/AppContext';

const App = () => {
  return (
    <>
      <AppContextProvidor>
        <SearchBar/>
        <ChartWrapper/>
      </AppContextProvidor>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));