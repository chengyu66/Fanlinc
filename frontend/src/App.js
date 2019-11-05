import React from 'react';
import './App.css';
import AppRouter from './AppRouter';
import './style/general.css';
import Header from './components/header/header';
import Footer from './components/footer/footer';

function App() {
  return (
    <div className="App">
          <Header />
      <div>
          <AppRouter />
      </div>
       <div>
          <Footer />
       </div>
    </div>
  );
}

export default App;
