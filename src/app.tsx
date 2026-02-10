import React from 'react';
import { createRoot } from 'react-dom/client';

import Dashboard from './components/Dashboard';
import { AppContextProvider } from './context/AppContext';

const App: React.FC = () => {
  return (
    <AppContextProvider>
      <Dashboard />
    </AppContextProvider>
  );
};

const container = document.getElementById('app');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
