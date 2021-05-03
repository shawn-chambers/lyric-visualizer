import React, { useContext } from 'react';
import ReactDOM from 'react-dom';

import SearchBar from './components/SearchBar';
import BarChart from './components/BarChart';
import { AppContextProvider } from './context/AppContext';
import Dashboard from './components/Dashboard';

const App = () => {

  return (
    <AppContextProvider>
      <SearchBar />
      <Dashboard />
      <BarChart />
    </AppContextProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));