import React from 'react';
import './App.css';
import AppRouter from './AppRouter';
import './style/general.css';
import Header from './components/header/header';
import Footer from './components/footer/footer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Header />
          <AppRouter />
          <Footer />
      </header>
    </div>
  );
}

export default App;
