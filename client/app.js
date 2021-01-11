import React from 'react';
import ReactDOM from 'react-dom';

import Data from './components/Data';
import { AppContextProvidor } from './context/AppContext';

const App = () => {
  return (
    <>
      <AppContextProvidor>
        <h1>Hello</h1>
        <Data/>
      </AppContextProvidor>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));