import React from 'react';
import './App.css';
import AppRouter from './AppRouter';
import './style/general.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <h1>Welcome </h1>
          <AppRouter />
      </header>
    </div>
  );
}

export default App;
