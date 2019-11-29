import React from 'react';
import './App.css';
import AppRouter from './AppRouter';
import './style/general.css';
import Header from './components/header/header';
import Footer from './components/footer/footer';
//import Search from './components/searchbar/search';

function App() {
  return (
    <div className="App">
      <div className="head">
          <Header />
      </div>
      <div className="content">
          <AppRouter />
      </div>
      <div className="foot">
          <Footer />
      </div>
    </div>
      
  );
}

export default App;
