import React from 'react';
import ReactDOM from 'react-dom';
import { AppContextProvider } from './context/AppContext';
import Dashboard from './components/Dashboard';

const App = () => {

  return (
    <AppContextProvider>
      <Dashboard />
    </AppContextProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));